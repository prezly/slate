import React from 'react';
import type { PropsWithChildren } from 'react';

import { Cross } from '#icons';

import { Button } from '../Button';

import styles from './ElementPlaceholder.module.scss';

interface Props {
    onClick?: () => void;
}

export function Container(props: PropsWithChildren<Props>) {
    return (
        <div className={styles.container}>
            <Button
                className={styles.closeIcon}
                variant="secondary"
                icon={Cross}
                round
                onClick={props.onClick}
            />
            {props.children}
        </div>
    );
}
