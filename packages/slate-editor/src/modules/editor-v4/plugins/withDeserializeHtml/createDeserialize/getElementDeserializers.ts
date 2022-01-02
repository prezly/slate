import type { DeserializeElement, Extension } from '@prezly/slate-commons';

export function getElementDeserializers(extensions: Extension[]): DeserializeElement {
    return extensions.reduce<DeserializeElement>(
        (deserializers, extension) => ({
            ...deserializers,
            ...extension.deserialize?.element,
        }),
        {},
    );
}

