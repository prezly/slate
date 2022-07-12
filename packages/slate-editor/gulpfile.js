import autoprefixer from 'autoprefixer';
import branch from 'branch-pipe';
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
const SCSS_SOURCES = 'src/**/*.scss';
const SCSS_DECLARATIONS = 'src/styles/**/*.scss';
const SCSS_COMPONENTS = [SCSS_SOURCES, `!${SCSS_DECLARATIONS}`];
const SCSS_MODULES = ['src/**/*.module.scss'];
const TYPESCRIPT_SOURCES = ['src/**/*.{ts,tsx}', '!**/*.test.*', '!**/jsx.ts'];
const TYPESCRIPT_ALIASES = {
    '#lodash': 'lodash-es',
    '#components': './src/components',
    '#extensions': './src/extensions',
    '#icons': './src/icons',
    '#lib': './src/lib',
    '#modules': './src/modules',
};
const SVG_ICONS = 'src/**/*.svg';

/**
 * Files that will produce build/esm and build/cjs JS deliverables.
 */
const JS_DELIVERABLE_SOURCES = [...TYPESCRIPT_SOURCES, ...SCSS_MODULES, SVG_ICONS];

gulp.task('build:esm', () => buildEsm());
gulp.task('build:sass', () => buildSass());
gulp.task('build:types', () => buildTypes());

gulp.task('watch:esm', watch(JS_DELIVERABLE_SOURCES, 'build:esm', buildEsm));
gulp.task('watch:sass', watch(SCSS_SOURCES, 'build:sass', buildSass));

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
                    .pipe(filter(SCSS_COMPONENTS))
                    .pipe(processSass())
                    .pipe(filter('*.ts'))
                    .pipe(gulp.dest('.css-modules/')),
            ]),
        )
        .pipe(babel({ extends: './babel.config.json' }))
        .pipe(gulp.dest('build/esm/'));
}

function buildTypes(files = JS_DELIVERABLE_SOURCES) {
    const compile = typescript.createProject(path.resolve('./tsconfig.build.json'), {
        isolatedModules: false, // otherwise, `gulp-typescript` disables generation of declaration files
        noEmit: false,
    });

    const output = gulp
        .src(files, { cwdbase: BASE_DIR })
        .pipe(
            branch.obj((stream) => [
                // Keep .ts sources files in the stream
                stream.pipe(filter(TYPESCRIPT_SOURCES)),
                // Generate TS class maps for CSS modules
                stream
                    .pipe(filter(SCSS_COMPONENTS))
                    .pipe(processSass())
                    .pipe(filter('*.ts'))
                    .pipe(gulp.dest('.css-modules/')),
            ]),
        )
        .pipe(compile());

    return output.dts
        .pipe(
            tap((file) => {
                const updatedContents = Object.entries(TYPESCRIPT_ALIASES).reduce(
                    (contents, [alias, real]) => {
                        const relative = path.relative(path.dirname(file.path), path.resolve(real));
                        return contents
                            .replaceAll(`from '${alias}`, `from '${relative}`)
                            .replaceAll(`import("${alias}`, `import("${relative}`);
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
        .src(SCSS_SOURCES)
        .pipe(
            branch.obj((stream) => [
                // keep declarations as uncompiled SCSS
                stream.pipe(filter(SCSS_DECLARATIONS)),
                // Process components SCSS
                stream.pipe(filter(SCSS_COMPONENTS)).pipe(processSass()),
            ]),
        )
        .pipe(
            branch.obj((stream) => [
                // Copy declarations as is
                stream.pipe(filter(SCSS_DECLARATIONS)).pipe(gulp.dest('build/')),
                // Concat CSS files into one
                stream
                    .pipe(filter('*.css'))
                    .pipe(concat('styles/styles.css'))
                    .pipe(gulp.dest('build/')),
                // Generate TS class maps for CSS modules
                stream.pipe(filter('*.ts')).pipe(gulp.dest('.css-modules/')),
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
