import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';

const TYPESCRIPT_SOURCES = 'src/**/*.{ts,tsx}';
const DEPENDENCIES_SOURCES = '../{slate-types,slate-hyperscript,slate-commons}/build/**/*.mjs';

gulp.task('build:code', function () {
    return gulp
        .src(TYPESCRIPT_SOURCES)
        .pipe(babel({ extends: '../../babel.config.js' }))
        .pipe(rename((file) => file.extname = '.mjs'))
        .pipe(gulp.dest('build/esm/'));
});

gulp.task('watch:code', function () {
    return gulp
        .watch([TYPESCRIPT_SOURCES, DEPENDENCIES_SOURCES], gulp.series('build:code'))
        .on('ready', () => console.log('Watching files'))
        .on('all', (event, path) => console.log(`[${event}] ${path}`));
});
