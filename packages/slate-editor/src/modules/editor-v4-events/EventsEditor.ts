import { Events } from '@prezly/events';
import { Editor } from 'slate';

import { EVENTS_PROPERTY } from './constants';
import type { EditorEventMap } from './types';

abstract class EventsEditor {
    static dispatchEvent<Event extends keyof EditorEventMap>(
        editor: Editor,
        event: Event,
        ...rest: EditorEventMap[Event] extends never ? [never?] : [EditorEventMap[Event]]
    ): void {
        if (EventsEditor.isEventsEditor(editor)) {
            editor[EVENTS_PROPERTY].dispatchEvent(event, ...rest);
        }
    }

    static isEventsEditor = (value: unknown): value is EventsEditor => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return Editor.isEditor(value) && value[EVENTS_PROPERTY] instanceof Events;
    };

    public abstract [EVENTS_PROPERTY]: Events<EditorEventMap>;
}

export default EventsEditor;
