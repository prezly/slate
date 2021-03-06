/* eslint-disable no-param-reassign */

import { DeserializeLeafValue, Extension } from '@prezly/slate-commons';

const getLeafDeserializers = (extensions: Extension[]): Record<string, DeserializeLeafValue[]> =>
    extensions.reduce<Record<string, DeserializeLeafValue[]>>((deserializers, extension) => {
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

export default getLeafDeserializers;
