import { useEffect, useState } from 'react';

import Observable from '../Observable';

const isMouseDownObservable = new Observable<boolean>(false);

document.addEventListener('mousedown', () => {
    isMouseDownObservable.value = true;
});

document.addEventListener('mouseup', () => {
    isMouseDownObservable.value = false;
});

function useIsMouseDown(): boolean {
    const [isMouseDown, setIsMouseDown] = useState<boolean>(isMouseDownObservable.value);

    useEffect(() => {
        const unsubscribe = isMouseDownObservable.subscribe(setIsMouseDown);

        return unsubscribe;
    }, []);

    return isMouseDown;
}

export default useIsMouseDown;
