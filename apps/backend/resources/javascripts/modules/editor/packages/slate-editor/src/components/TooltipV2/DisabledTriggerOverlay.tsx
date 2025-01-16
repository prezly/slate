import classNames from 'classnames';
import React from 'react';

import styles from './DisabledTriggerOverlay.module.scss';

interface Props {
    className?: string;
    onHide: () => void;
    onShow: () => void;
}

/**
 * This component can be used as a workaround if tooltip needs to be shown
 * when hovering a disabled element.
 * (onMouseOver & onMouseOut events do not fire on disabled elements)
 * It requires parent component to have `position: relative`.
 */
export function DisabledTriggerOverlay({ className, onHide, onShow }: Props) {
    return (
        <div
            className={classNames(styles.DisabledTriggerOverlay, className)}
            onMouseEnter={onShow}
            onMouseLeave={onHide}
        />
    );
}
