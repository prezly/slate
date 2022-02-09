import autoprefixer from 'autoprefixer';
import branch from 'branch-pipe';
import fs from 'fs';
import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import createSassProcessor from 'gulp-sass';
import tap from 'gulp-tap';
import typescript from 'gulp-typescript';
import use from 'gulp-use';
import path from 'path';
import postcssModules from 'postcss-modules';
import sassBackend from 'sass';
import File from 'vinyl';

const sass = createSassProcessor(sassBackend);

const BASE_DIR = './src';
const SASS_SOURCES = 'src/**/*.scss';
const SASS_DECLARATIONS = 'src/styles/**/*.scss';
const SASS_COMPONENTS = [SASS_SOURCES, `!${SASS_DECLARATIONS}`];
const TYPESCRIPT_SOURCES = ['src/**/*.{ts,tsx}', '!**/*.test.*', '!**/jsx.ts'];
const TYPESCRIPT_ALIASES = {
    '#lodash': 'lodash-es',
    '#components': './src/components',
    '#icons': './src/icons',
    '#lib': './src/lib',
    '#modules': './src/modules',
};
const SVG_ICONS = 'src/**/*.svg';

/**
 * Files that will produce build/esm and build/cjs JS deliverables.
 */
const JS_DELIVERABLE_SOURCES = [...TYPESCRIPT_SOURCES, ...SASS_COMPONENTS, SVG_ICONS];

const babelConfig = JSON.parse(fs.readFileSync('./babel.config.json', { encoding: 'utf-8' }));
const babelCommonjsConfig = { ...babelConfig, extends: '../../babel.cjs.config.json' };
const babelEsmConfig = { ...babelConfig, extends: '../../babel.esm.config.json' };

gulp.task('build:esm', () => buildEsm());
gulp.task('build:cjs', () => buildCommonjs());
gulp.task('build:sass', () => buildSass());
gulp.task('build:types', () => buildTypes());

gulp.task('watch:esm', watch(JS_DELIVERABLE_SOURCES, 'build:esm', buildEsm));
gulp.task('watch:cjs', watch(JS_DELIVERABLE_SOURCES, 'build:cjs', buildCommonjs));
gulp.task('watch:sass', watch(SASS_SOURCES, 'build:sass', buildSass));

function buildEsm(files = JS_DELIVERABLE_SOURCES) {
    return gulp
        .src(files, { base: BASE_DIR })
        .pipe(
            branch.obj((stream) => [
                // Keep .ts sources files in the stream
                stream.pipe(filter(TYPESCRIPT_SOURCES)),
                // Keep .svg icons in the stream
                stream.pipe(filter(SVG_ICONS)).pipe(rename((file) => (file.extname = '.svg.svg'))),
                // Generate TS class maps for CSS modules
                stream
                    .pipe(filter(SASS_COMPONENTS))
                    .pipe(processSass())
                    .pipe(filter('*.ts'))
                    .pipe(gulp.dest('.css-modules/')),
            ]),
        )
        .pipe(babel(babelEsmConfig))
        .pipe(rename((file) => (file.extname = '.mjs')))
        .pipe(gulp.dest('build/esm/'));
}

function buildCommonjs(files = JS_DELIVERABLE_SOURCES) {
    return gulp
        .src(files, { base: BASE_DIR })
        .pipe(
            branch.obj((stream) => [
                // Keep .ts sources files in the stream
                stream.pipe(filter(TYPESCRIPT_SOURCES)),
                // Keep .svg icons in the stream
                stream.pipe(filter(SVG_ICONS)).pipe(rename((file) => (file.extname = '.svg.svg'))),
                // Generate TS class maps for CSS modules
                stream
                    .pipe(filter(SASS_COMPONENTS))
                    .pipe(processSass())
                    .pipe(filter('*.ts'))
                    .pipe(gulp.dest('.css-modules/')),
            ]),
        )
        .pipe(babel(babelCommonjsConfig))
        .pipe(rename((file) => (file.extname = '.cjs')))
        .pipe(gulp.dest('build/cjs/'));
}

function buildTypes(files = JS_DELIVERABLE_SOURCES) {
    const compile = typescript.createProject(path.resolve('./tsconfig.build.json'), {
        isolatedModules: false, // otherwise, `gulp-typescript` disables generation of declaration files
        noEmit: false,
    });

    const output = gulp.src(files, { cwdbase: BASE_DIR })
        .pipe(branch.obj((stream) => [
            // Keep .ts sources files in the stream
            stream.pipe(filter(TYPESCRIPT_SOURCES)),
            // Generate TS class maps for CSS modules
            stream
                .pipe(filter(SASS_COMPONENTS))
                .pipe(processSass())
                .pipe(filter('*.ts'))
                .pipe(gulp.dest('.css-modules/')),
        ]))
        .pipe(compile());

    return output.dts
        .pipe(
            tap((file) => {
                const updatedContents = Object.entries(TYPESCRIPT_ALIASES).reduce(
                    (contents, [alias, real]) => {
                        const relative = path.relative(path.dirname(file.path), path.resolve(real));
                        return contents
                            .replace(`from '${alias}`, `from '${relative}`)
                            .replace(`import("${alias}`, `import("${relative}`);
                    },
                    file.contents.toString('utf-8'),
                );
                file.contents = Buffer.from(updatedContents, 'utf-8');
            }),
        )
        .pipe(gulp.dest('build/types'));
}

function buildSass() {
    return gulp
        .src(SASS_SOURCES)
        .pipe(
            branch.obj((stream) => [
                // keep declarations as uncompiled SCSS
                stream.pipe(filter(SASS_DECLARATIONS)),
                // Process components SCSS
                stream.pipe(filter(SASS_COMPONENTS)).pipe(processSass()),
            ]),
        )
        .pipe(
            branch.obj((stream) => [
                // Copy declarations as is
                stream.pipe(filter(SASS_DECLARATIONS)).pipe(gulp.dest('build/')),
                // Concat CSS files into one
                stream
                    .pipe(filter('*.css'))
                    .pipe(concat('styles/styles.css'))
                    .pipe(gulp.dest('build/')),
                // Generate TS class maps for CSS modules
                stream
                    .pipe(filter('*.ts'))
                    .pipe(gulp.dest('.css-modules/')),
            ]),
        );
}

/**
 * Take a stream of SCSS files and compile them to CSS 1:1.
 * Additionally emit a .ts class mapping file for every .module.scss file.
 */
function processSass() {
    return branch.obj((stream) => [
        stream
            .pipe(sass({ includePaths: ['./src'] }))
            .pipe(
                postcss(function (file) {
                    return {
                        plugins: [
                            postcssModules({
                                globalModulePaths: [/.*(?<!module.)css/],
                                getJSON: function (cssFileName, classMap) {
                                    file.cssModulesClassMap = classMap;
                                },
                            }),
                            autoprefixer({ grid: true }),
                        ],
                    };
                }),
            )
            .pipe(
                use(function generateTypescriptDefinitions(file) {
                    this.push(file);
                    if (Object.keys(file.cssModulesClassMap).length > 0) {
                        this.push(
                            new File({
                                cwd: file.cwd,
                                base: file.base,
                                path: file.path.replace(/\.css$/, '.scss.ts'),
                                contents: Buffer.from(
                                    `export default ${toPrettyJson(file.cssModulesClassMap)}`,
                                ),
                            }),
                        );
                    }
                }),
            ),
    ]);
}

/**
 * @param {string|string[]} files
 * @param {string} build
 * @param {(string)=>void} incremental
 * @returns {Function}
 */
function watch(files, build, incremental) {
    return gulp.series(build, function () {
        return gulp
            .watch(files)
            .on('ready', () => console.log('Watching files'))
            .on('all', (event, path) => console.log(`[${event}] ${path}`))
            .on('add', (path) => incremental(path))
            .on('change', (path) => incremental(path));
    });
}

/**
 * @param {*} value
 * @returns {string}
 */
function toPrettyJson(value) {
    return JSON.stringify(value, undefined, 4);
}
