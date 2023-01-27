import type { ReactNode, KeyboardEvent } from 'react';
import React from 'react';

import { Frame } from '../../components/Frame';

import styles from './FormFrame.module.scss';

interface Props {
    children: ReactNode;
    isSelected: boolean;
}

export function FormFrame({ children, isSelected }: Props) {
    return (
        <Frame
            active
            onKeyDown={stopPropagation}
            onKeyUp={stopPropagation}
            className={styles.FormFrame}
            format="card"
            selected={isSelected}
        >
            {children}
        </Frame>
    );
}

function stopPropagation(event: KeyboardEvent) {
    event.stopPropagation();
}
