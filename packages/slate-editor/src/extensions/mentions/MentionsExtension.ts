import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { ElementApi, type Node } from '@udecode/plate';

import { composeElementDeserializer } from '#modules/html-deserialization';

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
        return ElementApi.isElementType(node, type);
    }

    return {
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
    };
}
