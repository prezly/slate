import type { MutableRefObject, RefCallback } from 'react';
import React, { forwardRef } from 'react';
import type { ScrollbarProps } from 'react-custom-scrollbars-2';
import { Scrollbars } from 'react-custom-scrollbars-2';

import styles from './FancyScrollbars.module.scss';

export const FancyScrollbars = forwardRef<HTMLDivElement, ScrollbarProps>(
    ({ children, ...props }, ref) => {
        return (
            <Scrollbars
                renderThumbHorizontal={(props) => <div {...props} className={styles.hThumb} />}
                renderThumbVertical={(props) => <div {...props} className={styles.vThumb} />}
                renderTrackHorizontal={(props) => <div {...props} className={styles.hTrack} />}
                renderTrackVertical={(props) => <div {...props} className={styles.vTrack} />}
                {...props}
                ref={(scrollbars) => setReference(ref, scrollbars?.container)}
            >
                {children}
            </Scrollbars>
        );
    },
);

FancyScrollbars.displayName = 'FancyScrollbars';

function setReference<T>(ref: RefCallback<T> | MutableRefObject<T> | null, instance: T) {
    if (ref === null) return;
    if (typeof ref === 'function') return ref(instance);
    ref.current = instance;
}
