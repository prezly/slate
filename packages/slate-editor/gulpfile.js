const gulp = require('gulp');
const concat = require('gulp-concat');
const tap = require('gulp-tap');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');

const autoprefixer = require('autoprefixer');

function bubbleImportsUp(file) {
    function isUse(line) {
        return line.startsWith('@use ');
    }
    function isImport(line) {
        return line.startsWith('@import ');
    }

    const lines = file.contents.toString().split(/\n/g);
    const uses = new Set(lines.filter(isUse));
    const imports = new Set(lines.filter(isImport));
    const rest = lines.filter((line) => !isUse(line) && !isImport(line));

    file.contents = Buffer.from([...uses, ...imports, ...rest].join('\n'));
}

gulp.task('build:scss', function (done) {
    gulp.src(['src/**/*.scss', '!src/styles/*.scss'])
        .pipe(concat('styles.css'))
        .pipe(tap(bubbleImportsUp))
        .pipe(sass({ includePaths: 'src/' }))
        .pipe(postcss([
            autoprefixer({ grid: true }),
        ]))
        .pipe(gulp.dest('build/'));

    gulp.src('src/styles/*.scss')
        .pipe(gulp.dest('build/styles'));

    done();
})

function defaultTask(done) {
    done();
}

module.exports = defaultTask;
