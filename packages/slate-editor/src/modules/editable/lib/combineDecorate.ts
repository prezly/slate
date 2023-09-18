import type { Decorate } from '@prezly/slate-commons';

export function combineDecorate(decorateFns: Decorate[]): Decorate {
    return (entry) => {
        return decorateFns.flatMap((decorate) => decorate(entry));
    };
}
