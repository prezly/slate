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
import { fileURLToPath } from 'node:url';
import path from 'path';
import postcssModules from 'postcss-modules';
import sassBackend from 'sass';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sass = createSassProcessor(sassBackend);

const BASE_DIR = './src';
const SASS_SOURCES = 'src/**/*.scss';
const SASS_DECLARATIONS = 'src/styles/**/*.scss';
const SASS_MODULES_STYLESHEETS = ['src/**/*.scss', '!src/styles/**/*.scss'];
const CSS_MODULES = '.css-modules/**/*.module.scss.ts';
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

gulp.task(
    'watch:esm',
    watch([...TYPESCRIPT_SOURCES, CSS_MODULES, SVG_ICONS], 'build:esm', buildEsm),
);
gulp.task(
    'watch:cjs',
    watch([...TYPESCRIPT_SOURCES, CSS_MODULES, SVG_ICONS], 'build:cjs', buildCommonjs),
);
gulp.task('watch:sass', watch(SASS_SOURCES, 'build:sass', buildSass));

function buildEsm(files = [...TYPESCRIPT_SOURCES, CSS_MODULES, SVG_ICONS]) {
    return gulp
        .src(files, { base: BASE_DIR })
        .pipe(
            branch.obj((src) => [
                src.pipe(filter(TYPESCRIPT_SOURCES)).pipe(babel(babelEsmConfig)),

                src
                    .pipe(filter(SVG_ICONS))
                    .pipe(babel(babelEsmConfig))
                    .pipe(rename((file) => (file.extname = '.svg.mjs'))),

                src
                    .pipe(filter(CSS_MODULES))
                    .pipe(babel(babelEsmConfig))
                    .pipe(
                        rename((file) => {
                            file.dirname = file.dirname.replace('.css-modules', 'esm');
                        }),
                    ),
            ]),
        )
        .pipe(rename((file) => (file.extname = '.mjs')))
        .pipe(gulp.dest('build/esm/'));
}

function buildCommonjs(files = [...TYPESCRIPT_SOURCES, CSS_MODULES, SVG_ICONS]) {
    return gulp
        .src(files, { base: BASE_DIR })
        .pipe(
            branch.obj((src) => [
                src.pipe(filter(TYPESCRIPT_SOURCES)).pipe(babel(babelCommonjsConfig)),

                src
                    .pipe(filter(SVG_ICONS))
                    .pipe(babel(babelCommonjsConfig))
                    .pipe(rename((file) => (file.extname = '.svg.cjs'))),

                src
                    .pipe(filter(CSS_MODULES))
                    .pipe(babel(babelCommonjsConfig))
                    .pipe(
                        rename((file) => {
                            file.dirname = file.dirname.replace('.css-modules', 'cjs');
                        }),
                    ),
            ]),
        )
        .pipe(rename((file) => (file.extname = '.cjs')))
        .pipe(gulp.dest('build/cjs/'));
}

function buildTypes(files = [...TYPESCRIPT_SOURCES, CSS_MODULES]) {
    const compile = typescript.createProject(path.resolve('./tsconfig.build.json'), {
        isolatedModules: false, // otherwise, `gulp-typescript` disables generation of declaration files
        noEmit: false,
    });

    const output = gulp.src(files, { cwdbase: BASE_DIR }).pipe(compile());

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
    return stream
        .pipe(filter(SASS_MODULES_STYLESHEETS))
        .pipe(sass({ includePaths: ['./src'] }))
        .pipe(
            postcss([
                postcssModules({
                    globalModulePaths: [/.*(?<!module.)css/],
                    getJSON: function (cssFileName, json) {
                        const keys = Object.keys(json);

                        if (keys.length === 0) {
                            return;
                        }

                        const baseFileName = path.basename(cssFileName, '.css');
                        const baseDir = path.dirname(cssFileName);

                        const filePath = path.resolve(baseDir + `/${baseFileName}.scss.ts`);

                        const outputFilePath = filePath.replace(
                            __dirname + '/src',
                            __dirname + '/.css-modules',
                        );

                        const outputFolderPath = path.dirname(outputFilePath);

                        const content = `const classNames = ${JSON.stringify(
                            json,
                            undefined,
                            4,
                        )}\n\nexport default classNames`;

                        if (!fs.existsSync(outputFolderPath)) {
                            fs.mkdirSync(outputFolderPath, { recursive: true });
                        }

                        fs.writeFileSync(outputFilePath, content);
                    },
                }),
                autoprefixer({ grid: true }),
            ]),
        )
        .pipe(concat('styles/styles.css'));
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
