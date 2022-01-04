import fs from 'fs';
import path from 'path';

import { getAllExtensions } from '../../../test-utils';

import deserializeHtml from './deserializeHtml';

const extensions = getAllExtensions();

function readTestFile(filepath: string): string {
    const url = new URL(`__tests__/${filepath}`, import.meta.url);
    const absoluteFilepath = path.resolve(url.pathname);
    return fs.readFileSync(absoluteFilepath, 'utf-8');
}

const handleError = () => {};

describe('deserializeHtml', () => {
    it('Wraps orphan "list-items" into "lists"', () => {
        // https://github.com/prezly/prezly/pull/8292#discussion_r473031425
        const input = readTestFile('input/wraps-orphan-list-items-into-lists.html');
        const expected = readTestFile('expected/wraps-orphan-list-items-into-lists.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('Wraps orphan "list-item-texts" into "lists"', () => {
        // https://github.com/prezly/prezly/pull/8359#discussion_r478198175
        const input = readTestFile('input/wraps-orphan-list-item-texts-into-lists.html');
        const expected = readTestFile('expected/wraps-orphan-list-item-texts-into-lists.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('Removes orphan newlines in "paragraphs"', () => {
        const input = readTestFile('input/paragraphs-with-newlines.html');
        const expected = readTestFile('expected/paragraphs-with-newlines.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('Deserializes a "paragraph"', () => {
        const input = readTestFile('input/paragraph.html');
        const expected = readTestFile('expected/paragraph.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('Deserializes a nested "divider" (Google Docs)', () => {
        const input = readTestFile('input/google-docs-divider.html');
        const expected = readTestFile('expected/google-docs-divider.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('Deserializes a mix of "paragraphs" and "quotes"', () => {
        const input = readTestFile('input/paragraphs-and-quotes.html');
        const expected = readTestFile('expected/paragraphs-and-quotes.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('Deserializes nested "lists"', () => {
        const input = readTestFile('input/nested-lists.html');
        const expected = readTestFile('expected/nested-lists.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });
});
