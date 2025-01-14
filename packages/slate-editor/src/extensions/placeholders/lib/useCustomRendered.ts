import { useEffect, useState } from 'react';

export function useCustomRendered(isSelected: boolean) {
    const [isCustomRendered, setCustomRendered] = useState(false);

    useEffect(() => {
        // If the custom rendering is immediately enabled as the component mounts,
        // it results in a console error from Slate not being able to resolve
        // the underlying DOM node, if the custom rendered code contains an input
        // that is using autoFocus.
        setCustomRendered(true);
    }, []);

    useEffect(() => {
        if (!isSelected) {
            setCustomRendered(false);
        }
    }, [isSelected]);

    return [isCustomRendered, setCustomRendered] as const;
}
