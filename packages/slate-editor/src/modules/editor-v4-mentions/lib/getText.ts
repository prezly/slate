import { Editor, Location } from 'slate';

/**
 * See {@link Editor.string}.
 * If `at` is `null`, return an empty string.
 */
const getText = (editor: Editor, at: Location | null) => (at ? Editor.string(editor, at) : '');

export default getText;
