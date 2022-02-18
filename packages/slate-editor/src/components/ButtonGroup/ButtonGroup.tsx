import * as React from 'react';

import styles from './ButtonGroup.module.scss';

interface ButtonGroupProps {
    children: React.ReactNode[];
}

export function ButtonGroup(props: ButtonGroupProps) {
    return (
        <div className={styles['button-group']}>
            <>
                {props.children.map((node, index) =>
                    index === 0 ? (
                        node
                    ) : (
                        <>
                            <div className={styles.separator} />
                            {node}
                        </>
                    ),
                )}
            </>
        </div>
    );
}
