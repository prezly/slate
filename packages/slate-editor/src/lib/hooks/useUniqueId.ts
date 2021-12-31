import { useMemo } from 'react';

import { uniqueId } from '#lodash';

function useUniqueId(prefix?: string) {
    const id = useMemo(() => uniqueId(prefix), [prefix]);
    return id;
}

export default useUniqueId;
