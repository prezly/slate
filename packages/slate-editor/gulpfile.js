const { task, series, src, dest, watch } = require('gulp');
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

const SASS_DECLARATIONS = ['src/styles/*.scss'];
const SASS_COMPONENTS = ['src/**/*.scss', '!src/styles/*.scss'];

function compileComponents(done) {
    src(SASS_COMPONENTS)
        .pipe(concat('styles.css'))
        .pipe(tap(bubbleImportsUp))
        .pipe(sass({ includePaths: 'src/' }))
        .pipe(postcss([
            autoprefixer({ grid: true }),
        ]))
        .pipe(dest('build/'));

    done();
}

function copyDeclarations(done) {
    src(SASS_DECLARATIONS)
        .pipe(dest('build/styles'));

    done();
}

task('build:scss', series(compileComponents, copyDeclarations));

task('watch:scss', function (done) {
    watch(SASS_COMPONENTS, compileComponents);
    watch(SASS_DECLARATIONS, copyDeclarations);

    done();
});
