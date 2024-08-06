import classNames from 'classnames';
import * as React from 'react';

import styles from './Toolbox.module.scss';

type Props = {
    children: React.ReactNode;
    className?: string;
    withFullOpacity?: boolean;
};

export function Caption({ children, className, withFullOpacity = false }: Props) {
    return (
        <span
            className={classNames(styles.caption, className, {
                [styles['caption--full-opacity']]: withFullOpacity,
            })}
        >
            {children}
        </span>
    );
}
