import classNames from 'classnames';
import React from 'react';

import styles from './Overlay.module.scss';

export type OverlayMode = 'always' | 'autohide' | false;

interface Props {
    className?: string;
    selected: boolean;
    mode: OverlayMode;
    onClick?: () => void;
}

export function Overlay({ className, mode, onClick, selected }: Props) {
    if (mode === false) {
        return null;
    }
    return (
        <div
            className={classNames(className, styles.overlay, {
                [styles.hidden]: selected && mode === 'autohide',
            })}
            onClick={onClick}
        />
    );
}
