/* eslint-disable no-param-reassign */
import { Editor } from 'slate';

import { Extension } from '../types';

const withInlineVoid = (getExtensions: () => Extension[]) => <T extends Editor>(editor: T) => {
    const { isInline, isVoid } = editor;

    editor.isInline = (element) => {
        const extensions = getExtensions();
        const inlineTypes = extensions.flatMap((extension) => extension.inlineTypes || []);
        return inlineTypes.includes(element.type as string) ? true : isInline(element);
    };

    editor.isVoid = (element) => {
        const extensions = getExtensions();
        const voidTypes = extensions.flatMap((extension) => extension.voidTypes || []);
        return voidTypes.includes(element.type as string) ? true : isVoid(element);
    };

    return editor;
};

export default withInlineVoid;
