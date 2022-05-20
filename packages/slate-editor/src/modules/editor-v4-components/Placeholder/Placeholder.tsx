import { EditorCommands } from '@prezly/slate-commons';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';
import { useSlate } from 'slate-react';

import styles from './Placeholder.module.scss';

interface Props {
    children?: ReactNode;
    className?: string;
}

export function Placeholder({ children, className }: Props) {
    const editor = useSlate();

    if (!EditorCommands.isEmpty(editor)) {
        return null;
    }

    return <div className={classNames(styles.Placeholder, className)}>{children}</div>;
}
