import { useCallback, useState } from 'react';

import { useLatest } from '#lib';

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

    const toggle = useCallback(
        function (shouldOpen?: boolean) {
            setOpen(function (isNowOpen) {
                const willOpen = shouldOpen === undefined ? !isNowOpen : shouldOpen;

                if (willOpen === isNowOpen) {
                    return willOpen;
                }

                // Notify callbacks
                if (willOpen) {
                    freshParams.current.onOpen && freshParams.current.onOpen();
                } else {
                    freshParams.current.onClose && freshParams.current.onClose();
                }
                freshParams.current.onToggle && freshParams.current.onToggle(willOpen);

                return willOpen;
            });
        },
        [freshParams],
    );

    const open = useCallback(() => toggle(true), [toggle]);
    const close = useCallback(() => toggle(false), [toggle]);

    return [isOpen, { open, close, toggle }];
}
