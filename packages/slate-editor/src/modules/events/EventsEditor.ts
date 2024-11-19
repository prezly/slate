import type { RemoveListener } from '@prezly/events';
import { Events } from '@prezly/events';
import { noop } from '@technically/lodash';
import { isEditor, type SlateEditor } from '@udecode/plate-common';

import { EVENTS_PROPERTY } from './constants';
import type { EditorEventMap } from './types';
import type { EditorEventHandlers } from './types';

export abstract class EventsEditor {
    static addEventListener<Event extends keyof EditorEventMap>(
        editor: SlateEditor,
        event: Event,
        listener: EditorEventHandlers[Event],
    ): RemoveListener {
        if (EventsEditor.isEventsEditor(editor)) {
            return editor[EVENTS_PROPERTY].addEventListener(event, listener);
        }

        return noop;
    }

    static dispatchEvent<Event extends keyof EditorEventMap>(
        editor: SlateEditor,
        event: Event,
        ...rest: EditorEventMap[Event] extends never ? [never?] : [EditorEventMap[Event]]
    ): void {
        if (EventsEditor.isEventsEditor(editor)) {
            editor[EVENTS_PROPERTY].dispatchEvent(event, ...rest);
        }
    }

    static isEventsEditor = (value: unknown): value is EventsEditor => {
        // @ts-expect-error TODO: Fix this
        return isEditor(value) && value[EVENTS_PROPERTY] instanceof Events;
    };

    public abstract [EVENTS_PROPERTY]: Events<EditorEventMap>;
}
