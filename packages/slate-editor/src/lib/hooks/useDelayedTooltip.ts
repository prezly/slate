import { useRef, useState } from 'react';

import { useMountedState, useUnmount } from './react-use';

interface Parameters {
    defaultShow?: boolean;
    hideDelay?: number;
    showDelay?: number;
}

interface State {
    show: boolean;
}

interface Actions {
    onHide: () => void;
    onShow: () => void;
}

function useDelayedTooltip(parameters: Parameters = {}): [State, Actions] {
    const { defaultShow = false, hideDelay = 0, showDelay = 0 } = parameters;
    const hideTimeoutRef = useRef<number>();
    const showTimeoutRef = useRef<number>();
    const [show, setShow] = useState<boolean>(defaultShow);
    const isMounted = useMountedState();

    function onHide() {
        window.clearTimeout(showTimeoutRef.current);

        hideTimeoutRef.current = window.setTimeout(() => {
            if (isMounted()) {
                setShow(false);
            }
        }, hideDelay);
    }

    function onShow() {
        window.clearTimeout(hideTimeoutRef.current);

        showTimeoutRef.current = window.setTimeout(() => {
            if (isMounted()) {
                setShow(true);
            }
        }, showDelay);
    }

    useUnmount(() => {
        window.clearTimeout(hideTimeoutRef.current);
        window.clearTimeout(showTimeoutRef.current);
    });

    return [{ show }, { onHide, onShow }];
}

export default useDelayedTooltip;
