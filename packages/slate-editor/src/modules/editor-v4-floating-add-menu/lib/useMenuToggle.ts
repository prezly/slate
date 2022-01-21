import { useCallback, useEffect, useState } from 'react';

import { useLatest, usePrevious } from '#lib';

interface Parameters {
    onClose?: () => void;
    onOpen?: () => void;
    onToggle?: (isShown: boolean) => void;
}

interface Controls {
    open: () => void;
    close: () => void;
    toggle: (open?: boolean) => void;
}

export function useMenuToggle(params: Parameters = {}): [boolean, Controls] {
    const freshParams = useLatest(params);

    const [isOpen, setOpen] = useState(false);
    const wasOpen = usePrevious(isOpen);

    const toggle = useCallback(
        function (shouldOpen?: boolean) {
            setOpen(function (isNowOpen) {
                return shouldOpen === undefined ? !isNowOpen : shouldOpen;
            });
        },
        [freshParams],
    );

    const open = useCallback(() => toggle(true), [toggle]);
    const close = useCallback(() => toggle(false), [toggle]);

    useEffect(
        function () {
            if (wasOpen !== isOpen) {
                // Notify callbacks
                if (isOpen) {
                    freshParams.current.onOpen && freshParams.current.onOpen();
                } else {
                    freshParams.current.onClose && freshParams.current.onClose();
                }
                freshParams.current.onToggle && freshParams.current.onToggle(isOpen);
            }
        },
        [wasOpen, isOpen],
    );

    return [isOpen, { open, close, toggle }];
}
