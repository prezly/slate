import * as React from 'react';

import styles from './Toolbox.module.scss';

export function Caption(props: React.PropsWithChildren<Record<string, unknown>>) {
    return <span className={styles.caption}>{props.children}</span>;
}
