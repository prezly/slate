import type { BaseEditor } from 'slate';

import type { Extension } from '../types';

export interface ExtensionsEditor extends BaseEditor {
    extensions: Extension[];
}

export function withExtensions<T extends BaseEditor>(editor: T): T & ExtensionsEditor {
    return Object.assign(editor, {
        extensions: [],
    });
}
