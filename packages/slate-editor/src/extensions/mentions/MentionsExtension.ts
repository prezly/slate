import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { Node } from 'slate';
import { Element } from 'slate';

import type { MentionElementType } from './types';

interface Options<T extends string> {
    id: Extension['id'];
    normalizers: Extension['normalizers'];
    parseSerializedElement: (serialized: string) => MentionElementType | undefined;
    renderElement: Extension['renderElement'];
    type: T;
}

export function MentionsExtension<T extends string>({
    id,
    normalizers,
    parseSerializedElement,
    renderElement,
    type,
}: Options<T>): Extension {
    function isMention(node: Node) {
        return Element.isElementType(node, type);
    }

    return {
        deserialize: {
            element: {
                [type]: createDeserializeElement(parseSerializedElement),
            },
        },
        id,
        inlineTypes: [type],
        isVoid: isMention,
        normalizers,
        renderElement,
    };
}
