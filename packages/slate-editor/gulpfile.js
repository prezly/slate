import autoprefixer from 'autoprefixer';
import branch from 'branch-pipe';
import fs from 'fs';
import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import map from 'gulp-map';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import createSassProcessor from 'gulp-sass';
import tap from 'gulp-tap';
import typescript from 'gulp-typescript';
import path from 'path';
import sassBackend from 'sass';

const sass = createSassProcessor(sassBackend);

const BASE_DIR = './src';
const SASS_SOURCES = 'src/**/*.scss';
const SASS_DECLARATIONS = 'src/styles/**/*.scss';
const SASS_MODULES_STYLESHEETS = ['src/**/*.scss', '!src/styles/**/*.scss'];
const TYPESCRIPT_SOURCES = ['src/**/*.{ts,tsx}', '!**/*.test.*', '!**/jsx.ts'];
const TYPESCRIPT_ALIASES = {
    '#lodash': 'lodash-es',
    '#components': './src/components',
    '#icons': './src/icons',
    '#lib': './src/lib',
    '#modules': './src/modules',
};
const SVG_ICONS = 'src/**/*.svg';

const babelConfig = JSON.parse(fs.readFileSync('./babel.config.json', { encoding: 'utf-8' }));
const babelCommonjsConfig = { ...babelConfig, extends: '../../babel.cjs.config.json' };
const babelEsmConfig = { ...babelConfig, extends: '../../babel.esm.config.json' };

gulp.task('build:esm', () => buildEsm());
gulp.task('build:cjs', () => buildCommonjs());
gulp.task('build:sass', () => buildSass());
gulp.task('build:types', () => buildTypes());

gulp.task('watch:esm', watch([...TYPESCRIPT_SOURCES, SVG_ICONS], 'build:esm', buildEsm));
gulp.task('watch:cjs', watch([...TYPESCRIPT_SOURCES, SVG_ICONS], 'build:cjs', buildCommonjs));
gulp.task('watch:sass', watch(SASS_SOURCES, 'build:sass', buildSass));

function buildEsm(files = [...TYPESCRIPT_SOURCES, SVG_ICONS]) {
    return gulp
        .src(files, { base: BASE_DIR })
        .pipe(
            branch.obj((src) => [
                src
                    .pipe(filter(TYPESCRIPT_SOURCES))
                    .pipe(babel(babelEsmConfig))
                    .pipe(rename((file) => (file.extname = '.cjs'))),

                src
                    .pipe(filter(SVG_ICONS))
                    .pipe(babel(babelEsmConfig))
                    .pipe(rename((file) => (file.extname = '.svg.cjs'))),
            ]),
        )
        .pipe(rename((file) => (file.extname = '.mjs')))
        .pipe(gulp.dest('build/esm/'));
}

function buildCommonjs(files = [...TYPESCRIPT_SOURCES, SVG_ICONS]) {
    return gulp
        .src(files, { base: BASE_DIR })
        .pipe(
            branch.obj((src) => [
                src
                    .pipe(filter(TYPESCRIPT_SOURCES))
                    .pipe(babel(babelCommonjsConfig))
                    .pipe(rename((file) => (file.extname = '.cjs'))),

                src
                    .pipe(filter(SVG_ICONS))
                    .pipe(babel(babelCommonjsConfig))
                    .pipe(rename((file) => (file.extname = '.svg.cjs'))),
            ]),
        )
        .pipe(rename((file) => (file.extname = '.cjs')))
        .pipe(gulp.dest('build/cjs/'));
}

function buildTypes(files = TYPESCRIPT_SOURCES) {
    const compile = typescript.createProject(path.resolve('./tsconfig.build.json'), {
        isolatedModules: false, // otherwise, `gulp-typescript` disables generation of declaration files
        noEmit: false,
    });

    const output = gulp.src(files, { base: BASE_DIR }).pipe(compile());

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
        .pipe(branch.obj((src) => [copySassDeclarations(src), compileComponentsStylesheets(src)]))
        .pipe(gulp.dest('build/'));
}

/**
 * @param {stream:Transform} stream
 * @returns {stream:Transform}
 */
function copySassDeclarations(stream) {
    return stream.pipe(filter(SASS_DECLARATIONS));
}

/**
 * @param {stream:Transform} stream
 * @returns {stream:Transform}
 */
function compileComponentsStylesheets(stream) {
    /**
     * @param {vinyl:File} file
     * @returns {vinyl:File}
     */
    function toSassIndex(file) {
        const path = file.path.replace(file.base, '.').replace(/\.scss$/, '');
        const index = file.clone({ contents: false });
        index.contents = Buffer.from(`@import "${path}";\n`);
        return index;
    }

    return stream
        .pipe(filter(SASS_MODULES_STYLESHEETS))
        .pipe(map(toSassIndex))
        .pipe(concat('styles.scss'))
        .pipe(sass({ importPath: 'src/' }))
        .pipe(postcss([autoprefixer({ grid: true })]))
        .pipe(rename({ extname: '.css', dirname: 'styles/' }));
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
