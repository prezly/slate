import { type Node } from '@udecode/plate';

type Parse<E extends Node> = (serialized: string) => E | undefined;

export function createDeserializeElement<E extends Node>(parse: Parse<E>) {
    return function (element: HTMLElement): E | undefined {
        const serialized = element.getAttribute('data-slate-value');

        if (!serialized) {
            return undefined;
        }

        return parse(serialized);
    };
}
