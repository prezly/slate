import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import type { Modifier} from 'react-popper';
import { Popper } from 'react-popper';

import styles from './EditorBlock.module.scss';


interface Props {
    children: ReactNode;
    reference: HTMLElement | null;
}

const MODIFIERS: Modifier<string>[] = [
    {
        name: 'offset',
        enabled: true,
        options: {
            offset: [-4, 16],
        },
    },
    {
        name: 'flip',
        enabled: false,
    },
    {
        name: 'arrow',
        enabled: true,
        options: {
            padding: 19,
        }
    },
];

export function Menu({ children, reference }: Props) {
    return (
        <Popper
            referenceElement={reference || undefined}
            modifiers={MODIFIERS}
            placement="right-start"
        >
            {({ ref, style, arrowProps, placement }) => (
                <div className={styles.menu} ref={ref} style={style}>
                    <div
                        className={classNames(styles.arrow, {
                            [styles.top]: placement.indexOf('top') >= 0,
                            [styles.bottom]: placement.indexOf('bottom') >= 0,
                            [styles.left]: placement.indexOf('left') >= 0,
                            [styles.right]: placement.indexOf('right') >= 0,
                        })}
                        {...arrowProps}
                    />
                    {children}
                </div>
            )}
        </Popper>
    );
}
