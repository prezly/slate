import * as React from 'react';

import { Button } from '#components';
import { Cross } from '#icons';

import { Caption } from './Caption';
import styles from './Toolbox.module.scss';

interface HeaderProps {
    withCloseButton?: boolean;
    onCloseClick?: () => void;
}

export function Header(props: React.PropsWithChildren<HeaderProps>) {
    return (
        <div className={styles.header}>
            <Caption withFullOpacity>{props.children}</Caption>

            {props.withCloseButton && (
                <Button variant="clear" icon={Cross} onClick={props.onCloseClick} round />
            )}
        </div>
    );
}
