import { Editor, Location } from 'slate';

const isBlockActive = (editor: Editor, type: string, at?: Location): boolean => {
    const [match] = Array.from(
        Editor.nodes(editor, {
            match: (node) => node.type === type,
            at,
        }),
    );
    return Boolean(match);
};

export default isBlockActive;
