import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';

const TYPESCRIPT_SOURCES = 'src/**/*.{ts,tsx}';

gulp.task('build:esm', function() {
    return gulp
        .src(TYPESCRIPT_SOURCES)
        .pipe(babel({ extends: '../../babel.esm.config.json' }))
        .pipe(rename((file) => file.extname = '.mjs'))
        .pipe(gulp.dest('build/esm/'));
});

gulp.task('build:cjs', function() {
    return gulp
        .src(TYPESCRIPT_SOURCES)
        .pipe(babel({ extends: '../../babel.cjs.config.json' }))
        .pipe(rename((file) => file.extname = '.cjs'))
        .pipe(gulp.dest('build/cjs/'));
});

gulp.task('watch:esm', watch(TYPESCRIPT_SOURCES, 'build:esm'));
gulp.task('watch:cjs', watch(TYPESCRIPT_SOURCES, 'build:cjs'));

function watch(files, build) {
    return gulp.series(build, () => {
        return gulp
            .watch(files, gulp.series(build))
            .on('ready', () => console.log('Watching files'))
            .on('all', (event, path) => console.log(`[${event}] ${path}`));
    });
}
