import classNames from 'classnames';
import * as React from 'react';

import styles from './Toolbox.module.scss';

type Props = {
    children: React.ReactNode;
    withFullOpacity?: boolean;
};

export function Caption({ children, withFullOpacity = false }: Props) {
    return (
        <span
            className={classNames(styles.caption, {
                [styles['caption--full-opacity']]: withFullOpacity,
            })}
        >
            {children}
        </span>
    );
}
