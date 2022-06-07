import type { DeserializeElement, Extension } from '@prezly/slate-commons';

export function getElementDeserializers(extensions: Extension[]): DeserializeElement {
    const elementFallbacks = extensions.reduce(
        (deserializers, extension) => ({
            ...deserializers,
            ...extension.deserialize?.elementFallback,
        }),
        {},
    );

    const elements = extensions.reduce(
        (deserializers, extension) => ({
            ...deserializers,
            ...extension.deserialize?.element,
        }),
        {},
    );

    return { ...elementFallbacks, ...elements };
}
