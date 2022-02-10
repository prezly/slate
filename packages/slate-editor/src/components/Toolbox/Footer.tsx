import * as React from 'react';

import styles from './Toolbox.module.scss';

export function Footer(props: React.PropsWithChildren<Record<string, unknown>>) {
    return <div className={styles.footer}>{props.children}</div>;
}
