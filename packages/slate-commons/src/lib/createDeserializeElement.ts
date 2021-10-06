import { ElementNode } from '@prezly/slate-types';

type Parse<E extends ElementNode> = (serialized: string) => E | undefined;

const createDeserializeElement = <E extends ElementNode>(parse: Parse<E>) => {
    return (element: HTMLElement): E | undefined => {
        const serialized = element.getAttribute('data-slate-value');

        if (!serialized) {
            return undefined;
        }

        return parse(serialized);
    };
};

export default createDeserializeElement;
