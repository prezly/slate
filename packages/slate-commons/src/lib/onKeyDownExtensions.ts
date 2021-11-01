import { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

import type { Extension, OnKeyDown } from '../types';

const onKeyDownExtensions =
    (editor: Editor, extensions: Extension[], onKeyDownList: OnKeyDown[]) =>
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
