import { EditorCommands } from '@prezly/slate-commons';
import { useEffect, useRef } from 'react';
import { useSlate } from 'slate-react';

import { useUpdate } from '#lib';

interface Parameters {
    withFallbackToLastExistingNode: boolean;
}

export function useCurrentDomNode({
    withFallbackToLastExistingNode,
}: Parameters): HTMLElement | null {
    const editor = useSlate();
    const lastKnownElementRef = useRef<HTMLElement>();
    const update = useUpdate();

    useEffect(() => {
        /**
         * Slate fails to find the DOM node as soon as the active node changes.
         * Previously, we worked around it by using `useState` to trigger a re-render.
         * But this caused a stale element reference on rapid updates (e.g. holding Enter key).
         * We fix this bug by finding the element on each update.
         * But we still need to trigger a second render when the current node changes, after which
         * Slate is able to find the current node -> DOM node.
         * We use `setTimeout` to push the `update` after the rest of Slate and React updates.
         */
        setTimeout(update);
    }, [editor.selection, update]);

    const element = EditorCommands.getCurrentDomNode(editor);
    if (element) {
        lastKnownElementRef.current = element;
    }

    return withFallbackToLastExistingNode ? lastKnownElementRef.current || null : element;
}
