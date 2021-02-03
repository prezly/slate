import { Editor, ElementEntry, Transforms } from 'slate';

import { NODE_ID_MANAGER_ID_PROPERTY_NAME } from '../constants';

const GLOBALLY_ALLOWED_ATTRIBUTES = [NODE_ID_MANAGER_ID_PROPERTY_NAME];

const normalizeRedundantAttributes = (
    editor: Editor,
    [element, path]: ElementEntry,
    allowedAttributes: string[],
): boolean => {
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

    Transforms.setNodes(editor, attributesToUnset, { at: path });

    return true;
};

export default normalizeRedundantAttributes;
