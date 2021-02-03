import { Editor, Location, Node } from 'slate';

const isValidLocation = (editor: Editor, location: Location): boolean => {
    try {
        return Node.has(editor, Editor.path(editor, location));
    } catch {
        return false;
    }
};

export default isValidLocation;
