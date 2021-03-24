import { DeserializeElement, Extension } from '@prezly/slate-commons';

const getElementDeserializers = (extensions: Extension[]): DeserializeElement =>
    extensions.reduce<DeserializeElement>(
        (deserializers, extension) => ({
            ...deserializers,
            ...extension.deserialize?.element,
        }),
        {},
    );

export default getElementDeserializers;
