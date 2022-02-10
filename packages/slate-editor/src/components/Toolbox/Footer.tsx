import * as React from 'react';

import styles from './Toolbox.module.scss';

export function Footer(props: React.PropsWithChildren<Record<string, unknown>>) {
    return <div className={styles.__footer}>{props.children}</div>;
}
