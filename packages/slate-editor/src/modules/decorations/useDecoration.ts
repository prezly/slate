import type { Decorate } from '@prezly/slate-commons';
import { noop } from '@technically/lodash';
import { useContext, useEffect } from 'react';

import { DecorationsContext } from './DecorationsContext';

export function useDecoration(decorate: Decorate | undefined): void {
    const { attach } = useContext(DecorationsContext);

    useEffect(() => {
        if (decorate) {
            return attach(decorate);
        }
        return noop;
    }, [attach, decorate]);
}
