import classNames from 'classnames';
import React, { useState, type ReactNode } from 'react';

import { Caret } from '#icons';

import styles from './Accordion.module.scss';

interface Props {
    title: string;
    children: ReactNode;
}

export function Accordion({ title, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.Accordion}>
            <button className={styles.button} onClick={toggleOpen}>
                <span>{title}</span>
                {
                    <Caret
                        className={classNames(styles.icon, {
                            [styles.open]: isOpen,
                        })}
                    />
                }
            </button>
            <div
                className={classNames(styles.content, {
                    [styles.open]: isOpen,
                })}
            >
                {children}
            </div>
        </div>
    );
}
