import type { Decorate } from '../types';

export function combineDecorate(decorateFns: Decorate[]): Decorate {
    return function (entry) {
        return decorateFns.flatMap((decorate) => decorate(entry));
    };
}
