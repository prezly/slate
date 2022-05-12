import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

import styles from './BookmarkCard.module.scss';

type ContainerLayout = 'vertical' | 'horizontal';

interface ContainerProps {
    border?: boolean;
    layout: ContainerLayout;
}

export const Container = React.forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
    ({ border = true, layout, children }, ref) => {
        return (
            <div
                className={classNames(styles.container, {
                    [styles.border]: border,
                    [styles.vertical]: layout === 'vertical',
                    [styles.horizontal]: layout === 'horizontal',
                })}
                ref={ref}
            >
                {children}
            </div>
        );
    },
);

Container.displayName = 'Container';
