import { Editor, Location } from 'slate';

import isElementWithType from './isElementWithType';

const isBlockActive = (editor: Editor, type: string, at?: Location): boolean => {
    const [match] = Array.from(
        Editor.nodes(editor, {
            match: (node) => isElementWithType(node) && node.type === type,
            at,
        }),
    );
    return Boolean(match);
};

export default isBlockActive;
