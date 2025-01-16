import { useCallback } from 'react';

import { useLatest } from '#lib';

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

            if (willOpen) {
                params.current.callbacks.onOpen?.();
            } else {
                params.current.callbacks.onClose?.();
            }

            params.current.onChange(willOpen);
        },
        [isOpen],
    );

    const open = useCallback(() => toggle(true), [toggle]);
    const close = useCallback(() => toggle(false), [toggle]);

    return { open, close, toggle };
}
