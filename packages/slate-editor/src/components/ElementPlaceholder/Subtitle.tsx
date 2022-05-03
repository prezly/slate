import React from 'react';
import type { PropsWithChildren } from 'react';

import styles from './ElementPlaceholder.module.scss';

interface Props {}

export function Subtitle(props: PropsWithChildren<Props>) {
    return <div className={styles.subtitle}>{props.children}</div>;
}
