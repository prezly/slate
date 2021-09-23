import { createDeserializeElement, Extension } from '@prezly/slate-commons';

import { MentionElementType } from './types';

interface Options<T extends string> {
    id: Extension['id'];
    normalizers: Extension['normalizers'];
    parseSerializedElement: (serialized: string) => MentionElementType | undefined;
    renderElement: Extension['renderElement'];
    type: T;
}

const MentionsExtension = <T extends string>({
    id,
    normalizers,
    parseSerializedElement,
    renderElement,
    type,
}: Options<T>): Extension => ({
    deserialize: {
        element: {
            [type]: createDeserializeElement(parseSerializedElement),
        },
    },
    id,
    inlineTypes: [type],
    normalizers,
    renderElement,
    voidTypes: [type],
});

export default MentionsExtension;
