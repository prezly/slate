import React from 'react';
import type { PropsWithChildren } from 'react';

import styles from './ElementPlaceholder.module.scss';

interface Props {}

export function Illustration(props: PropsWithChildren<Props>) {
    return <div className={styles.illustration}>{props.children}</div>;
}
