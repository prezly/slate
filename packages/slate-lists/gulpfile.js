import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';

const TYPESCRIPT_SOURCES = 'src/**/*.{ts,tsx}';

gulp.task('build:esm', () => buildEsm());
gulp.task('build:cjs', () => buildCommonjs());
gulp.task('watch:esm', watch(TYPESCRIPT_SOURCES, 'build:esm', buildEsm));
gulp.task('watch:cjs', watch(TYPESCRIPT_SOURCES, 'build:cjs', buildCommonjs));

function buildEsm(files = TYPESCRIPT_SOURCES) {
    return gulp
        .src(files)
        .pipe(babel({ extends: '../../babel.esm.config.json' }))
        .pipe(rename((file) => (file.extname = '.mjs')))
        .pipe(gulp.dest('build/esm/'));
}

function buildCommonjs(files = TYPESCRIPT_SOURCES) {
    return gulp
        .src(files)
        .pipe(babel({ extends: '../../babel.cjs.config.json' }))
        .pipe(rename((file) => (file.extname = '.cjs')))
        .pipe(gulp.dest('build/cjs/'));
}

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
