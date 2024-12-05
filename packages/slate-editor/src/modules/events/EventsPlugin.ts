import type { Events } from '@prezly/events';
import type { PlatePlugin } from '@udecode/plate-common/react';
import { createPlatePlugin } from '@udecode/plate-common/react';

import { EVENTS_PROPERTY } from './constants';
import type { EditorEventMap } from './types';

export function EventsPlugin(events: Events<EditorEventMap>): PlatePlugin {
    return createPlatePlugin({
        key: 'EventsPlugin',
        extendEditor: ({ editor }) => {
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
        },
    });
}
