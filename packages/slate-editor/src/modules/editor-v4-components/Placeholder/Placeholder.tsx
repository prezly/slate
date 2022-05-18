import { EditorCommands } from '@prezly/slate-commons';
import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import { useSlate } from 'slate-react';

import styles from './Placeholder.module.scss';

interface Props {
    children?: ReactNode;
}

export const Placeholder: FunctionComponent<Props> = ({ children }) => {
    const editor = useSlate();

    if (!EditorCommands.isEmpty(editor)) {
        return null;
    }

    return <div className={styles.Placeholder}>{children}</div>;
};
