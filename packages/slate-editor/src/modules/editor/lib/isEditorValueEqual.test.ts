import { deserialize } from './deserialize';
import { isEditorValueEqual } from './isEditorValueEqual';

describe('slate-editor - isEditorValueEqual', () => {
    it('should consider structural equality', () => {
        const a = '{ "type": "document", "children": [] }';
        const b = '{ "children": [], "type": "document" }';
        expect(isEditorValueEqual(deserialize(a), deserialize(b))).toBe(true);
    });
});
