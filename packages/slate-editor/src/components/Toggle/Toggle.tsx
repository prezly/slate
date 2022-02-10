import * as React from 'react';

import styles from './Toggle.module.scss';

interface ToggleProps {
    value?: boolean;
    onChange?: (value: boolean) => void;
}

export function Toggle(props: React.PropsWithChildren<ToggleProps>) {
    return (
        <label className={styles.toggle}>
            <input
                type="checkbox"
                checked={props.value}
                onChange={(e) => props.onChange?.(e.target.checked)}
                className={styles.input}
            />

            {props.children && <span className={styles['label-text']}>{props.children}</span>}
        </label>
    );
}
