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

const sass = createSassProcessor(sassBackend);

const SASS_SOURCES = 'src/**/*.scss';
const SASS_DECLARATIONS = 'src/styles/**/*.scss';
const TYPESCRIPT_MODULES_SASS = ['src/**/*.scss', '!src/styles/**/*.scss'];

/*
 * TASKS
 */

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

gulp.task('watch:sass', function () {
    return gulp
        .watch(SASS_SOURCES, 'build:sass')
        .on('ready', () => console.log('Watching files'))
        .on('all', (event, path) => console.log(`[${event}] ${path}`));
});

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
