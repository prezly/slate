import classNames from 'classnames';
import * as React from 'react';

import styles from './Link.module.scss';

interface LinkProps {
    href: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
            {props.icon && <props.icon className={styles.icon} />}
        </a>
    );
}
