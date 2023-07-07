import type { Decorate } from '@prezly/slate-commons';
import { noop } from '@technically/lodash';
import { createContext } from 'react';

type Detach = () => void;

export type DecorationsConnector = {
    attach(decorate: Decorate): Detach;
};

export const DecorationsContext = createContext<DecorationsConnector>({
    attach() {
        return noop;
    },
});
