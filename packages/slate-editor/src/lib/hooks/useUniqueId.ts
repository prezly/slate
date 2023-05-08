import { uniqueId } from '@technically/lodash';
import { useMemo } from 'react';

export function useUniqueId(prefix?: string) {
    const id = useMemo(() => uniqueId(prefix), [prefix]);
    return id;
}
