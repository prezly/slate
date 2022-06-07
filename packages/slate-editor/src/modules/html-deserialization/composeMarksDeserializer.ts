import type { DeserializeMarks } from '@prezly/slate-commons';

export function composeMarksDeserializer(
    deserializers: DeserializeMarks[] | Record<string, DeserializeMarks>,
): DeserializeMarks {
    if (Array.isArray(deserializers)) {
        return composeMarksDeserializersList(deserializers);
    }
    return composeMarksDeserializersMap(deserializers);
}

function composeMarksDeserializersList(deserializers: DeserializeMarks[]): DeserializeMarks {
    return function deserializeMarks(node) {
        return deserializers.reduce<Record<string, any> | undefined>((result, deserializer) => {
            const attributes = deserializer(node);
            if (result && attributes) {
                return { ...result, ...attributes };
            }
            return attributes ?? result ?? undefined;
        }, undefined);
    };
}

function composeMarksDeserializersMap(
    deserializers: Record<string, DeserializeMarks>,
): DeserializeMarks {
    return function (node) {
        const type = node.getAttribute('data-slate-type') || node.nodeName;

        return deserializers[type]?.(node);
    };
}
