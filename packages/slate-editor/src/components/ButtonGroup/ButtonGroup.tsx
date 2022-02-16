import * as React from 'react';

import styles from './ButtonGroup.module.scss';

interface ButtonGroupProps {
    children: React.ReactNode[];
}

export function ButtonGroup(props: ButtonGroupProps) {
    return (
        <div className={styles['button-group']}>
            {props.children.map((node, index, arr) =>
                arr.length - 1 === index ? (
                    node
                ) : (
                    <>
                        {node}
                        <div className={styles.separator} />
                    </>
                ),
            )}
        </div>
    );
}
