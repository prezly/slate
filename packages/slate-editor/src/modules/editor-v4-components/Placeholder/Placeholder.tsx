import { EditorCommands } from '@prezly/slate-commons';
import type { FunctionComponent, ReactNode } from 'react';
import * as React from 'react';
import { useSlate } from 'slate-react';

import './Placeholder.scss';

interface Props {
    children?: ReactNode;
}

const Placeholder: FunctionComponent<Props> = ({ children }) => {
    const editor = useSlate();

    if (!EditorCommands.isEmpty(editor)) {
        return null;
    }

    return <div className="editor-v4-placeholder">{children}</div>;
};

export default Placeholder;
