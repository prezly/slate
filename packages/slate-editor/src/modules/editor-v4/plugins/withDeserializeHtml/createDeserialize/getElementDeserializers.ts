import type { DeserializeElement, Extension } from '@prezly/slate-commons';

function getElementDeserializers(extensions: Extension[]): DeserializeElement {
    return extensions.reduce<DeserializeElement>(
        (deserializers, extension) => ({
            ...deserializers,
            ...extension.deserialize?.element,
        }),
        {},
    );
}

export default getElementDeserializers;
