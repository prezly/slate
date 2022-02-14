import classNames from 'classnames';
import * as React from 'react';

import styles from './Link.module.scss';

interface LinkProps {
    href: string;
    Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    fullWidth?: boolean;
}

export function Link(props: React.PropsWithChildren<LinkProps>) {
    return (
        <a
            href={props.href}
            target="_blank"
            className={classNames(styles.link, {
                [styles['link--full-width']]: props.fullWidth,
            })}
            rel="noreferrer"
        >
            {props.children}
            {props.Icon && <props.Icon className={styles.icon} />}
        </a>
    );
}
