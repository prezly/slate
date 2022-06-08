import type { DeserializeElement, Extension } from '@prezly/slate-commons';

import { composeElementDeserializer } from '#modules/html-deserialization';

export function combineExtensionsElementDeserializers(extensions: Extension[]): DeserializeElement {
    const deserializeElementFallback = composeElementDeserializer(
        extensions
            .map((extension) => extension.deserialize?.elementFallback)
            .filter(Boolean) as DeserializeElement[],
    );
    const deserializeElement = composeElementDeserializer(
        extensions
            .map((extension) => extension.deserialize?.element)
            .filter(Boolean) as DeserializeElement[],
    );

    return composeElementDeserializer([deserializeElement, deserializeElementFallback]);
}
