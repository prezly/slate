import { useMemo } from 'react';

import { uniqueId } from '#lodash';

export function useUniqueId(prefix?: string) {
    const id = useMemo(() => uniqueId(prefix), [prefix]);
    return id;
}
