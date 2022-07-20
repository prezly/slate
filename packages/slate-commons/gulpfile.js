import gulp from 'gulp';
import babel from 'gulp-babel';

const BASE_DIR = './src';
const TYPESCRIPT_SOURCES = ['src/**/*.{ts,tsx}', '!**/*.test.{ts,tsx}'];

gulp.task('build:esm', () => buildEsm());
gulp.task('watch:esm', () => watch(TYPESCRIPT_SOURCES, buildEsm));

function buildEsm(files = TYPESCRIPT_SOURCES) {
    return gulp
        .src(files, { base: BASE_DIR })
        .pipe(babel({ extends: '../../babel.config.json' }))
        .pipe(gulp.dest('build/esm/'));
}

function watch(files, incremental) {
    return gulp
        .watch(files)
        .on('ready', () => console.log('Watching files'))
        .on('all', (event, path) => console.log(`[${event}] ${path}`))
        .on('add', (path) => incremental(path))
        .on('change', (path) => incremental(path));
}
