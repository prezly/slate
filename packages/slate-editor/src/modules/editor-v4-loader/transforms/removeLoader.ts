import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Location } from 'slate';

import { isLoaderElement } from '../lib';

export default function removeLoader(editor: Editor, at?: Location): void {
    EditorCommands.removeNode(editor, {
        at,
        match: isLoaderElement,
    });
}
