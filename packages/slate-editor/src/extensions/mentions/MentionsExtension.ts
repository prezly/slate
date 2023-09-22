import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import type { Node } from 'slate';
import { Element } from 'slate';

import { composeElementDeserializer } from '#modules/html-deserialization';

import type { MentionElementType } from './types';

interface Options<T extends string> {
    id: Extension['id'];
    type: T;
    normalizeNode?: Extension['normalizeNode'];
    parseSerializedElement: (serialized: string) => MentionElementType | undefined;
    renderElement: Extension['renderElement'];
}

// TODO: Get rid of this abstraction?
export function MentionsExtension<T extends string>({
    id,
    normalizeNode,
    parseSerializedElement,
    renderElement,
    type,
}: Options<T>) {
    function isMention(node: Node) {
        return Element.isElementType(node, type);
    }

    return useRegisterExtension({
        deserialize: {
            element: composeElementDeserializer({
                [type]: createDeserializeElement(parseSerializedElement),
            }),
        },
        id,
        isInline: isMention,
        isVoid: isMention,
        normalizeNode,
        renderElement,
    });
}
