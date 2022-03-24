import classNames from 'classnames';
import React from 'react';

import styles from './EditorBlock.module.scss';

export type OverlayMode = 'always' | 'autohide' | false;

interface Props {
    selected: boolean;
    mode: OverlayMode;
    onClick?: () => void;
}

export function Overlay({ mode, onClick, selected }: Props) {
    if (mode === false) {
        return null;
    }
    return (
        <div
            className={classNames(styles.overlay, {
                [styles.hidden]: selected && mode === 'autohide',
            })}
            onClick={onClick}
        />
    );
}
