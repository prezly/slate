import { EditorCommands } from '@prezly/slate-commons';

import { ParagraphElementType } from '../types';

import createParagraph from './createParagraph';

const parseSerializedElement = (serialized: string): ParagraphElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (EditorCommands.isParagraphElement(parsed)) {
        return createParagraph(parsed.children);
    }

    return undefined;
};

export default parseSerializedElement;
