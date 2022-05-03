import React from 'react';
import type { PropsWithChildren } from 'react';

import styles from './ElementPlaceholder.module.scss';

interface Props {}

export function Title(props: PropsWithChildren<Props>) {
    return <div className={styles.title}>{props.children}</div>;
}
