import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import React from 'react';

import styles from './BookmarkCard.module.scss';

type ContainerLayout = 'vertical' | 'horizontal';

interface ContainerProps {
    border?: boolean;
    layout: ContainerLayout;
    isSelected?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(
    ({ border = true, isSelected, layout, children }, ref) => {
        return (
            <div
                className={classNames(styles.container, {
                    [styles.border]: border,
                    [styles.selected]: isSelected,
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
