import { EditorCommands } from '@prezly/slate-commons';
import { ParagraphNode } from '@prezly/slate-types';

import createParagraph from './createParagraph';

const parseSerializedElement = (serialized: string): ParagraphNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (EditorCommands.isParagraphElement(parsed)) {
        return createParagraph(parsed.children);
    }

    return undefined;
};

export default parseSerializedElement;
