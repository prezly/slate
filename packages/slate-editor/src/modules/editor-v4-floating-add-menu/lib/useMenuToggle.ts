import { useCallback } from 'react';

import { useLatest, useUpdateEffect } from '#lib';

interface Callbacks {
    onClose?: () => void;
    onOpen?: () => void;
}

interface Controls {
    open: () => void;
    close: () => void;
    toggle: (open?: boolean) => void;
}

export function useMenuToggle(
    isOpen: boolean,
    onChange: (show: boolean) => void,
    callbacks: Callbacks,
): Controls {
    const params = useLatest({ onChange, callbacks });

    const toggle = useCallback(
        function (shouldOpen?: boolean) {
            const willOpen = shouldOpen !== undefined ? shouldOpen : !isOpen;

            if (willOpen === isOpen) {
                return;
            }

            params.current.onChange(willOpen);
        },
        [isOpen],
    );

    const open = useCallback(() => toggle(true), [toggle]);
    const close = useCallback(() => toggle(false), [toggle]);

    useUpdateEffect(
        function triggerCallbacks() {
            if (isOpen) {
                params.current.callbacks.onOpen && params.current.callbacks.onOpen();
            } else {
                params.current.callbacks.onClose && params.current.callbacks.onClose();
            }
        },
        [isOpen],
    );

    return { open, close, toggle };
}
