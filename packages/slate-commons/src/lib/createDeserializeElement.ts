import { Element } from 'slate';

type Parse<E extends Element> = (serialized: string) => E | undefined;

const createDeserializeElement = <E extends Element>(
    parse: Parse<E>,
    onError: (error: Error) => void,
) => {
    return (element: HTMLElement): E | undefined => {
        const serialized = element.getAttribute('data-slate-value');

        if (!serialized) {
            return undefined;
        }

        try {
            return parse(serialized);
        } catch (error) {
            onError(error);
            return undefined;
        }
    };
};

export default createDeserializeElement;
