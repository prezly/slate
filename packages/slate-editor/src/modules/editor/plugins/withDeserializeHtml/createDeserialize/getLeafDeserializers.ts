/* eslint-disable no-param-reassign */

import type { DeserializeLeaf, Extension } from '@prezly/slate-commons';

type Deserializer = DeserializeLeaf[string];

export function getLeafDeserializers(extensions: Extension[]): DeserializeLeaf {
    return extensions.reduce((deserializers, extension) => {
        return combineDeserializers(deserializers, extension.deserialize?.leaf ?? {});
    }, {});
}

function combineDeserializers(base: DeserializeLeaf, override: DeserializeLeaf): DeserializeLeaf {
    return Object.keys(override).reduce(function (result, tagName) {
        return {
            ...result,
            [tagName]: combine(base[tagName], override[tagName]),
        };
    }, base);
}

function combine(base: Deserializer | undefined, override: Deserializer | undefined): Deserializer {
    if (base && override) {
        // Merge all resulting node properties together
        return (node) => ({ ...base(node), ...override(node) });
    }
    return override ?? base ?? noop;
}

function noop() {
    return undefined;
}
