import { isEqual } from '@technically/lodash';
import { useCallback, useRef } from 'react';

import { useLatest } from '#lib';

import type { Value } from './types';

type OnChange = (value: Value) => void;

/**
 * Wrap the onChange handler to notify outer code only on meaningful updates.
 */
export function useOnChange(onChange: OnChange): OnChange {
    const props = useLatest({ onChange });
    const prev = useRef<Value>();
    return useCallback(
        (value) => {
            if (!isEqual(prev.current, value)) {
                prev.current = value;
                props.current.onChange(value);
            }
        },
        [props, prev],
    );
}
