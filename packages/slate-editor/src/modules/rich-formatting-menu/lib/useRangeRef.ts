import { type RangeRef } from '@udecode/plate';
import { useState } from 'react';

type Value = RangeRef | null;

export function useRangeRef(): [Value, (ref: Value) => void, () => void] {
    const [ref, setRef] = useState<Value>(null);

    function updateRef(ref: Value) {
        setRef((prev) => {
            prev?.unref();
            return ref;
        });
    }

    function clearRef() {
        updateRef(null);
    }

    return [ref, updateRef, clearRef];
}
