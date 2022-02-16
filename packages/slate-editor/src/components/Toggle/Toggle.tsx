import * as React from 'react';

import styles from './Toggle.module.scss';

interface ToggleProps {
    name: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
}

export function Toggle(props: React.PropsWithChildren<ToggleProps>) {
    return (
        <label className={styles.toggle}>
            <input
                type="checkbox"
                checked={props.value}
                name={props.name}
                onChange={(e) => props.onChange?.(e.target.checked)}
                className={styles.input}
                disabled={props.disabled}
            />

            {props.children && <span className={styles['label-text']}>{props.children}</span>}
        </label>
    );
}
