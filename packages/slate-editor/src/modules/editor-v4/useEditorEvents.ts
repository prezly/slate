import type { Listener } from '@prezly/events';
import type { RefObject } from 'react';
import { useEffect } from 'react';

import type { EditorEventHandlers, EditorEventMap } from '../../modules/editor-v4-events';

import type { EditorRef } from './types';

export function useEditorEvents(
    editorRef: RefObject<EditorRef> | undefined,
    handlers: Partial<EditorEventHandlers>,
): void {
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
}
