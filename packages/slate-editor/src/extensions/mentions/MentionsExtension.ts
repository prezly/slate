import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import type { Node } from 'slate';
import { Element } from 'slate';

import type { MentionElementType } from './types';

interface Options<T extends string> {
    id: Extension['id'];
    type: T;
    normalizeNode?: Extension['normalizeNode'];
    parseSerializedElement: (serialized: string) => MentionElementType | undefined;
    renderElement: Extension['renderElement'];
}

export function MentionsExtension<T extends string>({
    id,
    normalizeNode,
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
        isInline: isMention,
        isVoid: isMention,
        normalizeNode,
        renderElement,
    };
}
