import { isEditorValueEqual } from './isEditorValueEqual';
import { deserialize } from './deserialize';

describe('slate-editor - isEditorValueEqual', () => {
    it('should consider structural equality', () => {
        const a = '{ "type": "document", "children": [] }';
        const b = '{ "children": [], "type": "document" }';
        expect(isEditorValueEqual(deserialize(a), deserialize(b))).toBe(true);
    });
});
