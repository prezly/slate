import classNames from 'classnames';
import React, { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { useSelected } from 'slate-react';

import styles from './EntryPointElement.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const EntryPointElement = forwardRef<HTMLDivElement, Props>(
    ({ children, className, ...props }, ref) => {
        const isFocused = useSelected();
        return (
            <div
                {...props}
                data-slate-block="hidden"
                className={classNames(styles.InitialEntryPointElement, className, {
                    [styles.focused]: isFocused,
                })}
                contentEditable={isFocused}
                suppressContentEditableWarning={true}
                ref={ref}
            >
                {children}
            </div>
        );
    },
);

EntryPointElement.displayName = 'InitialEntryPointElement';
