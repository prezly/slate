import type { DeserializeElement, Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { isHtmlBlockElement } from '@udecode/plate-core';
import type { Node } from 'slate';

export const EXTENSION_ID = 'DefaultDeserializationExtension';

interface Parameters {
    createNode: (props: Partial<Node>) => Node | undefined;
    deserializeBlockElement: DeserializeElement;
}

export function DefaultDeserializationExtension({
    createNode,
    deserializeBlockElement,
}: Parameters): Extension {
    function deserializeElement(element: HTMLElement) {
        if (element.getAttribute('data-slate-type')) {
            return createDeserializeElement(parseNode);
        }
        if (isHtmlBlockElement(element)) {
            return deserializeBlockElement(element);
        }
        return undefined;
    }

    function parseNode(serialized: string) {
        try {
            const data = JSON.parse(serialized);
            if (data && typeof data === 'object') {
                return createNode(data);
            }
        } catch {
            return undefined;
        }
        return undefined;
    }

    return {
        id: EXTENSION_ID,
        deserialize: {
            elementFallback: deserializeElement,
        },
    };
}
