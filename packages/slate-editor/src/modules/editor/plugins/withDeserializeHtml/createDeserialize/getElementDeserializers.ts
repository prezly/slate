import type { DeserializeElement, Extension } from '@prezly/slate-commons';

export function getElementDeserializers(extensions: Extension[]): DeserializeElement {
    const elementFallbacks = extensions.reduce(
        (deserializers, extension) =>
            combineDeserializers(deserializers, extension.deserialize?.elementFallback ?? {}),
        {},
    );

    const elements = extensions.reduce(
        (deserializers, extension) =>
            combineDeserializers(deserializers, extension.deserialize?.element ?? {}),
        {},
    );

    return combineDeserializers(elementFallbacks, elements);
}

export function combineDeserializers(
    base: DeserializeElement,
    additional: DeserializeElement,
): DeserializeElement {
    return Object.keys(additional).reduce(
        (result, tagName): DeserializeElement => {
            const previous = result[tagName];
            const override = additional[tagName];
            if (previous) {
                return {
                    ...result,
                    [tagName]: (element) => override(element) ?? previous(element),
                };
            }
            return { ...result, [tagName]: override };
        },
        base,
    );
}
