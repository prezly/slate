import { EditorCommands } from '@prezly/slate-commons';
import { useEditorState } from '@udecode/plate-common/react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import React from 'react';

import styles from './Placeholder.module.scss';

interface Props {
    children?: ReactNode;
    className?: string;
}

export function Placeholder({ children, className }: Props) {
    const editor = useEditorState();

    if (!EditorCommands.isEmpty(editor)) {
        return null;
    }

    return <div className={classNames(styles.Placeholder, className)}>{children}</div>;
}
