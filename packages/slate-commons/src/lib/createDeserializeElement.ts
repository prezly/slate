import type { Node } from 'slate';

type Parse<E extends Node> = (serialized: string) => E | undefined;

const createDeserializeElement = <E extends Node>(parse: Parse<E>) => {
    return (element: HTMLElement): E | undefined => {
        const serialized = element.getAttribute('data-slate-value');

        if (!serialized) {
            return undefined;
        }

        return parse(serialized);
    };
};

export default createDeserializeElement;
