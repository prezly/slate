import fs from 'fs';
import path from 'path';

import { getAllExtensions } from '../../../test-utils';

import { deserializeHtml } from './deserializeHtml';

const extensions = getAllExtensions();

function readTestFile(filepath: string): string {
    const url = new URL(`__tests__/${filepath}`, import.meta.url);
    const absoluteFilepath = path.resolve(url.pathname);
    return fs.readFileSync(absoluteFilepath, 'utf-8');
}

function handleError() {}

describe('deserializeHtml', () => {
    it('should wrap orphan "list-items" into "lists"', () => {
        // https://github.com/prezly/prezly/pull/8292#discussion_r473031425
        const input = readTestFile('01.wraps-orphan-list-items-into-lists.html');
        const expected = readTestFile('01.wraps-orphan-list-items-into-lists.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('should wrap orphan "list-item-texts" into "lists"', () => {
        // https://github.com/prezly/prezly/pull/8359#discussion_r478198175
        const input = readTestFile('02.wraps-orphan-list-item-texts-into-lists.html');
        const expected = readTestFile('02.wraps-orphan-list-item-texts-into-lists.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('should remove orphan newlines in "paragraphs"', () => {
        const input = readTestFile('03.paragraphs-with-newlines.html');
        const expected = readTestFile('03.paragraphs-with-newlines.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('it should deserialize a "paragraph"', () => {
        const input = readTestFile('04.paragraph.html');
        const expected = readTestFile('04.paragraph.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('it should deserialize a nested "divider" (Google Docs)', () => {
        const input = readTestFile('05.google-docs-divider.html');
        const expected = readTestFile('05.google-docs-divider.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('it should deserialize a mix of "paragraphs" and "quotes"', () => {
        const input = readTestFile('06.paragraphs-and-quotes.html');
        const expected = readTestFile('06.paragraphs-and-quotes.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });

    it('it should deserialize nested "lists"', () => {
        const input = readTestFile('07.nested-lists.html');
        const expected = readTestFile('07.nested-lists.json');

        expect(deserializeHtml(extensions, input, handleError)).toMatchObject(JSON.parse(expected));
    });
});
