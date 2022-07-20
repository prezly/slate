import { uniqueId } from 'lodash-es';
import { useMemo } from 'react';

export function useUniqueId(prefix?: string) {
    const id = useMemo(() => uniqueId(prefix), [prefix]);
    return id;
}
