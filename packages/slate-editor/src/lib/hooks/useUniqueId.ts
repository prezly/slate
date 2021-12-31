import { useMemo } from 'react';

import { uniqueId } from '#lodash';

const useUniqueId = (prefix?: string) => {
    const id = useMemo(() => uniqueId(prefix), [prefix]);
    return id;
};

export default useUniqueId;
