import type { Events } from '@prezly/events';
import type { SlateEditor } from '@udecode/plate-common';

import { EVENTS_PROPERTY } from './constants';
import type { EditorEventMap } from './types';

export function withEvents(events: Events<EditorEventMap>) {
    return <T extends SlateEditor>(editor: T): T => {
        const parent = {
            undo: editor.undo,
            redo: editor.redo,
        };
        editor.undo = () => {
            events.dispatchEvent('undo');
            return parent.undo();
        };
        editor.redo = () => {
            events.dispatchEvent('redo');
            return parent.redo();
        };

        return Object.defineProperty(editor, EVENTS_PROPERTY, { value: events });
    };
}
