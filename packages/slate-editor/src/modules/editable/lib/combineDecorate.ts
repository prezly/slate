import type { Decorate } from '@prezly/slate-commons';

export function combineDecorate(decorateFns: Decorate[]): Decorate {
    return function ({ editor, entry }) {
        return decorateFns.flatMap((decorate) => decorate({ editor, entry }));
    };
}
