/* eslint-disable no-param-reassign */

import type { DeserializeMarks, Extension } from '@prezly/slate-commons';

type Deserializer = DeserializeMarks[string];

export function combineMarksDeserializersConfig(extensions: Extension[]): DeserializeMarks {
    return extensions.reduce((deserializers, extension) => {
        return combineDeserializers(deserializers, extension.deserialize?.marks ?? {});
    }, {});
}

function combineDeserializers(
    base: DeserializeMarks,
    override: DeserializeMarks,
): DeserializeMarks {
    return Object.keys(override).reduce(function (result, tagName) {
        return {
            ...result,
            [tagName]: combineFunctions(base[tagName], override[tagName]),
        };
    }, base);
}

function combineFunctions(
    base: Deserializer | undefined,
    override: Deserializer | undefined,
): Deserializer {
    if (base && override) {
        // Merge all resulting node properties together
        return (node) => ({ ...base(node), ...override(node) });
    }
    return override ?? base ?? noop;
}

function noop() {
    return undefined;
}
