import type { Events } from '@prezly/events';
import { useState } from 'react';
import type { Editor } from 'slate';
import { createEditor as createSlateEditor } from 'slate';

import type { EditorEventMap } from '../events';
import { withEvents } from '../events';

import { createEditor } from './createEditor';

interface Parameters {
    events: Events<EditorEventMap>;
}

export function useCreateEditor({ events }: Parameters): Editor {
    const [editor] = useState(() => {
        return withEvents(events)(createEditor(createSlateEditor()));
    });

    return editor;
}
