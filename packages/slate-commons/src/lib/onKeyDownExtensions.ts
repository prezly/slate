import { KeyboardEvent } from 'react';
import { ReactEditor } from 'slate-react';

import { Extension, OnKeyDown } from '../types';

const onKeyDownExtensions =
    (editor: ReactEditor, extensions: Extension[], onKeyDownList: OnKeyDown[]) =>
    (event: KeyboardEvent) => {
        onKeyDownList.forEach((onKeyDown) => {
            onKeyDown(event, editor);
        });

        extensions.forEach(({ onKeyDown }) => {
            if (onKeyDown) {
                onKeyDown(event, editor);
            }
        });
    };

export default onKeyDownExtensions;
