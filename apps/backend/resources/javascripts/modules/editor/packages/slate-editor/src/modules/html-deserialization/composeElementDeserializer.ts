import type { DeserializeElement } from '@prezly/slate-commons';

export function composeElementDeserializer(
    deserializers: DeserializeElement[] | Record<string, DeserializeElement>,
): DeserializeElement {
    if (Array.isArray(deserializers)) {
        return composeElementDeserializersList(deserializers);
    }
    return composeElementDeserializersMap(deserializers);
}

function composeElementDeserializersList(deserializers: DeserializeElement[]): DeserializeElement {
    return function deserializeElement(node) {
        for (const deserializer of deserializers) {
            const result = deserializer(node);
            if (result) return result;
        }
        return undefined;
    };
}

function composeElementDeserializersMap(
    deserializers: Record<string, DeserializeElement>,
): DeserializeElement {
    return function (node) {
        const type = node.getAttribute('data-slate-type') || node.nodeName;

        return deserializers[type]?.(node);
    };
}
