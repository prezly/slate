import type { DeserializeMarks, Extension } from '@prezly/slate-commons';

import { composeMarksDeserializer } from '#modules/html-deserialization';

export function combineExtensionsMarkDeserializers(extensions: Extension[]): DeserializeMarks {
    return composeMarksDeserializer(
        extensions
            .map((extension) => extension.deserialize?.marks)
            .filter(Boolean) as DeserializeMarks[],
    );
}
