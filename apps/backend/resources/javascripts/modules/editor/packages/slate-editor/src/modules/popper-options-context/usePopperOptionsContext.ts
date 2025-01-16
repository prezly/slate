import { useContext } from 'react';

import { PopperOptionsContext } from './PopperOptionsContext';

export function usePopperOptionsContext() {
    const context = useContext(PopperOptionsContext);
    return context;
}
