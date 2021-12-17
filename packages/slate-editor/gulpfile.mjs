// General imports
import autoprefixer from 'autoprefixer';
import branch from 'branch-pipe';
import gulp from 'gulp';
import sassBackend from 'sass';
import { Transform } from 'stream';

// Processors
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import map from 'gulp-map';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import createSassProcessor from 'gulp-sass';
import babel from 'gulp-babel';

const sass = createSassProcessor(sassBackend);

const SASS_SOURCES = 'src/**/*.scss';
const SASS_DECLARATIONS = 'src/styles/**/*.scss';
const TYPESCRIPT_MODULES_SASS = ['src/**/*.scss', '!src/styles/**/*.scss'];
const TYPESCRIPT_SOURCES = 'src/**/*.{ts,tsx}';
const SVG_ICONS = 'src/**/*.svg';
const DEPENDENCIES_SOURCES = '../{slate-types,slate-hyperscript,slate-commons,slate-lists}/build/**/*.mjs';

gulp.task('build:code', function () {
    return gulp
        .src(TYPESCRIPT_SOURCES)
        .pipe(babel({ extends: '../../babel.config.js' }))
        .pipe(rename((file) => file.extname = '.mjs'))
        .pipe(gulp.dest('build/esm/'));
});

gulp.task('watch:code', gulp.series('build:code', function () {
    return gulp
        .watch([TYPESCRIPT_SOURCES, DEPENDENCIES_SOURCES], gulp.series('build:code'))
        .on('ready', () => console.log('Watching files'))
        .on('all', (event, path) => console.log(`[${event}] ${path}`));
}));

gulp.task('build:svg', function () {
    return gulp
        .src(SVG_ICONS)
        .pipe(babel({ extends: '../../babel.config.js' }))
        .pipe(rename((file) => file.extname = '.svg.mjs'))
        .pipe(gulp.dest('build/esm/'));
});

gulp.task('watch:svg', gulp.series('build:svg', function () {
    return gulp
        .watch(SVG_ICONS, gulp.series('build:svg'))
        .on('ready', () => console.log('Watching files'))
        .on('all', (event, path) => console.log(`[${event}] ${path}`));
}));

gulp.task('build:sass', function () {
    return gulp
        .src(SASS_SOURCES)
        .pipe(
            branch.obj((src) => [
                copySassDeclarations(src),
                compileComponentsStylesheets(src),
            ]),
        )
        .pipe(gulp.dest('build/'));
});

gulp.task('watch:sass', gulp.series('build:sass', function () {
    return gulp
        .watch(SASS_SOURCES, gulp.series('build:sass'))
        .on('ready', () => console.log('Watching files'))
        .on('all', (event, path) => console.log(`[${event}] ${path}`));
}));

/**
 * @param {Transform} stream
 * @returns {Transform}
 */
function copySassDeclarations(stream) {
    return stream.pipe(filter(SASS_DECLARATIONS));
}

/**
 * @param {Transform} stream
 * @returns {Transform}
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
        .pipe(filter(TYPESCRIPT_MODULES_SASS))
        .pipe(map(toSassIndex))
        .pipe(concat('styles.scss'))
        .pipe(sass({ importPath: 'src/' }))
        .pipe(postcss([autoprefixer({ grid: true })]))
        .pipe(rename({ extname: '.css', dirname: 'styles/' }));
}
