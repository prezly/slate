import type Events from '@prezly/events';
import type { Editor } from 'slate';

import { EVENTS_PROPERTY } from './constants';
import type { EditorEventMap } from './types';

const withEvents = (events: Events<EditorEventMap>) => {
    return <T extends Editor>(editor: T): T => {
        return Object.defineProperty(editor, EVENTS_PROPERTY, { value: events });
    };
};

export default withEvents;
