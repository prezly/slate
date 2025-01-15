import type { ElementEntry, SlateEditor } from '@udecode/plate';

import { NODE_ID_MANAGER_ID_PROPERTY_NAME } from '../constants';

const GLOBALLY_ALLOWED_ATTRIBUTES = [NODE_ID_MANAGER_ID_PROPERTY_NAME];

export function normalizeRedundantAttributes(
    editor: SlateEditor,
    [element, path]: ElementEntry,
    allowedAttributes: string[],
): boolean {
    const attributes = Object.keys(element);
    const disallowedAttributes = attributes.filter(
        (attribute) => ![...allowedAttributes, ...GLOBALLY_ALLOWED_ATTRIBUTES].includes(attribute),
    );

    if (disallowedAttributes.length === 0) {
        return false;
    }

    const attributesToUnset = disallowedAttributes.reduce(
        (result, attribute) => ({
            ...result,
            [attribute]: undefined,
        }),
        {},
    );

    editor.tf.setNodes(attributesToUnset, { at: path });

    return true;
}
