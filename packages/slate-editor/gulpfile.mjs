// General imports
import autoprefixer from 'autoprefixer';
import branch from 'branch-pipe';
import fs from 'fs';
import gulp from 'gulp';
import path from 'path';
import sassBackend from 'sass';
import { Transform } from 'stream';
import through from 'through2';
import Vinyl from 'vinyl';

// Processors
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import createSassProcessor from 'gulp-sass';
import tap from 'gulp-tap';

const sass = createSassProcessor(sassBackend);

const SOURCES = ['src/**/*.{ts,tsx,scss,svg}', '!src/**/*.test.*', '!**/jsx.ts'];

const SIBLING_PACKAGES_SOURCES = ['../{slate-types,slate-commons,slate-lists}/build/**/*.{js,ts}'];

const TYPESCRIPT_MODULES = '**/*.{ts,tsx}';
const SVG_ICONS = '**/*.svg';
const SASS_DECLARATIONS = 'src/styles/**/*.scss';

/*
 * TASKS
 */

export function build() {
    return gulp
        .src(SOURCES)
        .pipe(
            branch.obj((src) => [
                compileTypescriptModules(src),
                copySassDeclarations(src),
                compileComponentsStylesheets(src),
            ]),
        )
        .pipe(gulp.dest('build/'));
}

export function watch() {
    return gulp
        .watch([...SOURCES, ...SIBLING_PACKAGES_SOURCES], build)
        .on('ready', () => console.log('Watching files'))
        .on('all', (event, path) => console.log(`[${event}] ${path}`));
}

/*
 * INTERNAL
 */

/**
 * @param {Transform} stream
 * @returns {Transform}
 */
function compileTypescriptModules(stream) {
    const extensions = {
        '.svg': '.svg.js',
        '.ts': '.js',
    };

    return stream
        .pipe(filter([TYPESCRIPT_MODULES, SVG_ICONS]))
        .pipe(babel())
        .pipe(
            branch.obj((src) => [
                rewriteJsImports(src, /\.svg$/, (path) => `${path}.js`),
            ]),
        )
        .pipe(branch.obj((src) => [removeJsImports(src, /\.scss$/)]))
        .pipe(rename((file) => (file.extname = extensions[file.extname] ?? file.extname)));
}

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
     * @param {Vinyl} file
     * @param {BufferEncoding} _enc
     * @param {Function} callback
     */
    function extractReferencedScssStylesheets(file, _enc, callback) {
        const matches = findJsImports(file.contents.toString(), /\.scss$/);

        for (const [importLine, importPath] of matches) {
            const stylesheetPath = path.resolve(path.dirname(file.path), importPath);
            const stylesheet = new Vinyl({
                cwd: file.cwd,
                base: file.base,
                path: stylesheetPath,
                contents: fs.readFileSync(stylesheetPath),
            });
            this.push(stylesheet);
        }
        callback();
    }

    return stream
        .pipe(filter(TYPESCRIPT_MODULES))
        .pipe(through.obj(extractReferencedScssStylesheets))
        .pipe(concat('styles.css'))
        .pipe(
            tap((file) => {
                file.contents = Buffer.from(bubbleSassImportsUp(file.contents.toString()));
            }),
        )
        .pipe(sass({ importPath: 'src/' }))
        .pipe(postcss([autoprefixer({ grid: true })]));
}

/**
 * @param {string} contents
 * @returns {string}
 */
function bubbleSassImportsUp(contents) {
    function isUse(line) {
        return line.startsWith('@use ');
    }

    function isImport(line) {
        return line.startsWith('@import ');
    }

    const lines = contents.split(/\n/g);
    const uses = new Set(lines.filter(isUse));
    const imports = new Set(lines.filter(isImport));
    const rest = lines.filter((line) => !isUse(line) && !isImport(line));

    return [...uses, ...imports, ...rest].join('\n');
}

/**
 * @param {string} contents
 * @param {RegExp} regex
 * @returns {string[][]}
 */
function findJsImports(contents, regex) {
    return contents
        .split('\n')
        .map((line) => [line, line.match(/^(?:import|export) (?:[^']+ from )?'([^']+)';/)])
        .filter(([line, match]) => Boolean(match))
        .map(([line, match]) => [line, match[1]])
        .filter(([line, importPath]) => regex.test(importPath));
}

/**
 * @param {Transform} stream
 * @param {RegExp} regex
 * @returns {Transform}
 */
function removeJsImports(stream, regex) {
    return stream.pipe(
        through.obj((file, _enc, callback) => {
            const matches = findJsImports(file.contents.toString(), regex);
            if (matches.length === 0) {
                return callback(null, file);
            }

            const lines = matches.map(([line]) => line);
            const filtered = file.contents
                .toString()
                .split('\n')
                .filter((line) => !lines.includes(line))
                .join('\n');

            const copy = file.clone();
            copy.contents = Buffer.from(filtered);

            callback(null, copy);
        }),
    );
}

/**
 * @param {Transform} stream
 * @param {RegExp} regex
 * @param {Function} rewrite
 * @returns {Transform}
 */
function rewriteJsImports(stream, regex, rewrite) {
    return stream.pipe(
        through.obj((file, _enc, callback) => {
            const matches = findJsImports(file.contents.toString(), regex);

            if (matches.length === 0) {
                return callback(null, file);
            }

            const replacements = Object.fromEntries(
                matches.map(([line, importPath]) => [
                    line,
                    line.replace(importPath, rewrite(importPath)),
                ]),
            );
            const rewritten = file.contents
                .toString()
                .split('\n')
                .map((line) => replacements[line] ?? line)
                .join('\n');

            const copy = file.clone();
            copy.contents = Buffer.from(rewritten);

            callback(null, copy);
        }),
    );
}
