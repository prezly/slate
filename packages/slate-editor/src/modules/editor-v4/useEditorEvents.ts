import { Listener } from '@prezly/events';
import { RefObject, useEffect } from 'react';

import { EditorEventHandlers, EditorEventMap } from '../../modules/editor-v4-events';

import { EditorRef } from './types';

const useEditorEvents = (
    editorRef: RefObject<EditorRef> | undefined,
    handlers: Partial<EditorEventHandlers>,
): void => {
    const events = editorRef?.current?.events;

    useEffect(() => {
        const entries = Object.entries(handlers) as [keyof EditorEventMap, Listener<unknown>][];

        entries.forEach(([event, handler]) => {
            if (events) {
                events.addEventListener(event, handler);
            }
        });

        return () => {
            entries.forEach(([event, handler]) => {
                if (events) {
                    events.removeEventListener(event, handler);
                }
            });
        };
    }, [events, handlers]);
};

export default useEditorEvents;
