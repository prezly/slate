/* eslint-disable no-param-reassign */

import type { DeserializeLeafValue, Extension } from '@prezly/slate-commons';

export function getLeafDeserializers(
    extensions: Extension[],
): Record<string, DeserializeLeafValue[]> {
    return extensions.reduce<Record<string, DeserializeLeafValue[]>>((deserializers, extension) => {
        const leaf = extension.deserialize?.leaf;

        if (!leaf) {
            return deserializers;
        }

        Object.keys(leaf || {}).forEach((tag) => {
            if (!deserializers[tag]) {
                deserializers[tag] = [leaf[tag]];
            } else {
                deserializers[tag].push(leaf[tag]);
            }
        });

        return deserializers;
    }, {});
}
