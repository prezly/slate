import classNames from 'classnames';
import React, { useState, type ReactNode, useEffect } from 'react';

import { Caret } from '#icons';
import { useLatest } from '#lib';

import styles from './Accordion.module.scss';

interface Props {
    title: string;
    children: ReactNode;
    onExpand?: () => void;
    onCollapse?: () => void;
}

export function Accordion({ title, children, onExpand, onCollapse }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const callbacks = useLatest({ onExpand, onCollapse });

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (isOpen) {
            callbacks.current.onExpand?.();
        } else {
            callbacks.current.onCollapse?.();
        }
    }, [isOpen]);

    return (
        <div className={styles.Accordion}>
            <button className={styles.button} onClick={toggleOpen}>
                <span>{title}</span>
                <Caret
                    className={classNames(styles.icon, {
                        [styles.open]: isOpen,
                    })}
                />
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
