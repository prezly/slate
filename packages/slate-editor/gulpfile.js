import autoprefixer from 'autoprefixer';
import branch from 'branch-pipe';
import { readFileSync } from 'fs';
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

const TYPESCRIPT_ALIASES = loadPathsMapping('./tsconfig.build.json', { base: './src' });
const BABEL_ALIASES = loadPathsMapping('./tsconfig.build.json', { base: './' });

const BASE_DIR = './src';
const SCSS_SOURCES = 'src/**/*.scss';
const SCSS_GLOBAL_STYLESHEETS = 'src/styles/**/*.scss';
const SCSS_MODULES = ['src/**/*.module.scss'];
const TYPESCRIPT_SOURCES = [
    'src/**/*.{ts,tsx}',
    '!**/hyperscript.ts',
    '!**/*.test.*',
    '!**/*.stories.tsx',
];
const SVG_ICONS = 'src/**/*.svg';

/**
 * Files that will produce build/* JS deliverables.
 */
const JS_DELIVERABLE_SOURCES = [...TYPESCRIPT_SOURCES, ...SCSS_MODULES, SVG_ICONS];

gulp.task('build:esm', () => buildEsm());
gulp.task('build:sass', () => buildSass());
gulp.task('build:types', () => buildTypes());

gulp.task('watch:esm', () => watch(JS_DELIVERABLE_SOURCES, buildEsm));
gulp.task('watch:sass', () => watch(SCSS_SOURCES, buildSass));

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
                stream.pipe(filter(SCSS_MODULES)).pipe(processSass()).pipe(filter('*.ts')),
            ]),
        )
        .pipe(
            babel({
                extends: '../../babel.config.json',
                plugins: [['babel-plugin-module-resolver', { alias: BABEL_ALIASES }]],
            }),
        )
        .pipe(gulp.dest('build/'));
}

function buildTypes(files = JS_DELIVERABLE_SOURCES) {
    const compile = typescript.createProject(path.resolve('./tsconfig.build.json'), {
        isolatedModules: false, // otherwise, `gulp-typescript` disables generation of declaration files
        noEmit: false,
    });

    return gulp
        .src(files, { cwdbase: BASE_DIR })
        .pipe(
            branch.obj((stream) => [
                // Keep .ts sources files in the stream
                stream.pipe(filter(TYPESCRIPT_SOURCES)),
                // Generate TS class maps for CSS modules
                stream.pipe(filter(SCSS_MODULES)).pipe(processSass()).pipe(filter('*.ts')),
            ]),
        )
        .pipe(compile())
        .pipe(
            inlineTypescriptAliases({
                aliases: TYPESCRIPT_ALIASES,
                baseDir: './build',
            }),
        )
        .pipe(gulp.dest('build'));
}

function buildSass() {
    return gulp
        .src(SCSS_SOURCES)
        .pipe(
            branch.obj((stream) => [
                // keep declarations as uncompiled SCSS
                stream.pipe(filter(SCSS_GLOBAL_STYLESHEETS)),
                // Combine all SCSS modules to a single file
                stream
                    .pipe(filter(SCSS_MODULES))
                    .pipe(processSass())
                    .pipe(filter('*.css'))
                    .pipe(concat('styles/styles.css')),
            ]),
        )
        .pipe(gulp.dest('build/'));
}

/**
 * Take a stream of SCSS files and compile them to CSS 1:1.
 * Additionally emit a .ts class mapping file for every .module.scss file.
 */
function processSass() {
    return branch.obj((stream) => [
        stream
            .pipe(sass({ includePaths: [BASE_DIR] }))
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
 * @param {Record<string,string>} aliases
 * @param {string} baseDir
 */
function inlineTypescriptAliases({ aliases, baseDir }) {
    return branch.obj((stream) => [
        stream.pipe(
            tap((file) => {
                const updatedContents = Object.entries(aliases).reduce(
                    (contents, [alias, real]) => {
                        const resolvedAlias = path.relative(
                            path.dirname(path.resolve(baseDir, file.relative)),
                            path.resolve(baseDir, real),
                        );

                        return contents
                            .replaceAll(`from '${alias}`, `from '${resolvedAlias}`)
                            .replaceAll(`import '${alias}`, `import '${resolvedAlias}`);
                    },
                    file.contents.toString('utf-8'),
                );
                file.contents = Buffer.from(updatedContents, 'utf-8');
            }),
        ),
    ]);
}

/**
 * @param {string|string[]} files
 * @param {(string)=>void} incremental
 * @returns {Function}
 */
function watch(files, incremental) {
    return gulp
        .watch(files)
        .on('ready', () => console.log('Watching files'))
        .on('all', (event, path) => console.log(`[${event}] ${path}`))
        .on('add', (path) => incremental(path))
        .on('change', (path) => incremental(path));
}

/**
 * @param {*} value
 * @returns {string}
 */
function toPrettyJson(value) {
    return JSON.stringify(value, undefined, 4);
}

/**
 * @param {string} tsconfigPath
 * @param {string} base
 */
function loadPathsMapping(tsconfigPath, { base = './' } = {}) {
    const tsconfig = JSON.parse(readFileSync(tsconfigPath, { encoding: 'utf-8' }));
    const baseUrl = tsconfig.compilerOptions.baseUrl;

    return Object.entries(tsconfig.compilerOptions.paths).reduce((aliases, [alias, paths]) => {
        if (paths.length === 0) {
            return aliases;
        }

        const resolved = path.join(baseUrl, stripWildcard(paths[0]));

        return {
            ...aliases,
            [stripWildcard(alias)]: `./${path.relative(base, resolved)}`,
        };
    }, {});

    function stripWildcard(path) {
        return path.endsWith('/*') ? path.slice(0, -2) : path;
    }
}
