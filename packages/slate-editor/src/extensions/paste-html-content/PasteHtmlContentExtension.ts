import { cleanDocx } from '@prezly/docx-cleaner';
import type { DataTransferHandler } from '@prezly/slate-commons';
import { EditorCommands, useRegisterExtension } from '@prezly/slate-commons';
import { useCallback } from 'react';
import type { Editor, Node } from 'slate';
import { Element } from 'slate';
import { useSlateStatic } from 'slate-react';

import { EventsEditor } from '#modules/events';

import { deserializeHtml } from './lib';

export const EXTENSION_ID = 'PasteHtmlContentExtension';

export function PasteHtmlContentExtension() {
    const editor = useSlateStatic();

    const insertData = useCallback<DataTransferHandler>((dataTransfer, next) => {
        function handleError(error: unknown) {
            return EventsEditor.dispatchEvent(editor, 'error', error);
        }

        const html = dataTransfer.getData('text/html');

        if (html) {
            const rtf = dataTransfer.getData('text/rtf');
            const cleanHtml = tryCleanDocx(html, rtf, handleError);
            const nodes = deserializeHtml(editor.extensions, cleanHtml, handleError);

            if (nodes.length === 0) {
                // If there are no "nodes" then there is no interesting "text/html" in clipboard.
                // Pass through to default "insertData" so that "text/plain" is used if available.
                return next(dataTransfer);
            }

            const singleTextBlockInserted = checkSingleTextBlockInserted(editor, nodes);

            if (singleTextBlockInserted) {
                // If it's a single block inserted, inherit block formatting from the destination
                // location, instead of overwriting it with the pasted block style.
                // @see CARE-1853
                EditorCommands.insertNodes(editor, singleTextBlockInserted.children, {
                    ensureEmptyParagraphAfter: true,
                    mode: 'highest',
                });
                return;
            }

            EditorCommands.insertNodes(editor, nodes, {
                ensureEmptyParagraphAfter: true,
                mode: 'highest',
            });
            return;
        }

        next(dataTransfer);
    }, []);

    return useRegisterExtension({
        id: EXTENSION_ID,
        insertData,
    });
}

function tryCleanDocx(html: string, rtf: string, onError: (error: unknown) => void): string {
    try {
        return cleanDocx(html, rtf);
    } catch (error) {
        onError(error);
        return html;
    }
}

function checkSingleTextBlockInserted(editor: Editor, nodes: Node[]): Element | undefined {
    const [node] = nodes;

    if (
        nodes.length === 1 &&
        Element.isElement(node) &&
        editor.isBlock(node) &&
        !editor.isRichBlock(node)
    ) {
        return node;
    }
    return undefined;
}
