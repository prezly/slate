import getVShapes from './getVShapes';
import { readTestFile } from './test-utils';

const parser = new DOMParser();

describe('getVShapes', () => {
    it('Extracts spids of all v:shapes', () => {
        const input = parser.parseFromString(readTestFile('input/v-shapes.html'), 'text/html');

        expect(getVShapes(input)).toEqual({
            Picture_x0020_2: '_x0000_i1026',
            Picture_x0020_3: '_x0000_i1025',
        });
    });
});
