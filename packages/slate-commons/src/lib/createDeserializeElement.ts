import { Element } from 'slate';

type Parse<E extends Element> = (serialized: string) => E | undefined;

const createDeserializeElement = <E extends Element>(parse: Parse<E>) => {
    return (element: HTMLElement): E | undefined => {
        const serialized = element.getAttribute('data-slate-value');

        if (!serialized) {
            return undefined;
        }

        return parse(serialized);
    };
};

export default createDeserializeElement;
