import { uniqueId } from 'lodash-es';
import { useMemo } from 'react';

const useUniqueId = (prefix?: string) => {
    const id = useMemo(() => uniqueId(prefix), [prefix]);
    return id;
};

export default useUniqueId;
