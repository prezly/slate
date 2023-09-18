/* eslint-disable no-param-reassign */

import { cleanDocx } from '@prezly/docx-cleaner';
import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Node } from 'slate';
import { Element } from 'slate';

import { EventsEditor } from '#modules/events';

import { deserializeHtml } from './deserializeHtml';

function tryCleanDocx(html: string, rtf: string, onError: (error: unknown) => void): string {
    try {
        return cleanDocx(html, rtf);
    } catch (error) {
        onError(error);
        return html;
    }
}

export function withDeserializeHtml(getExtensions: () => Extension[]) {
    return function <T extends Editor>(editor: T) {
        const { insertData } = editor;

        function handleError(error: unknown) {
            return EventsEditor.dispatchEvent(editor, 'error', error);
        }

        editor.insertData = function (data) {
            const slateFragment = data.getData('application/x-slate-fragment');

            if (slateFragment) {
                insertData(data);
                return;
            }

            const html = data.getData('text/html');

            if (html) {
                const rtf = data.getData('text/rtf');
                const cleanHtml = tryCleanDocx(html, rtf, handleError);
                const extensions = getExtensions();
                const nodes = deserializeHtml(extensions, cleanHtml, handleError);

                if (nodes.length === 0) {
                    // If there are no "nodes" then there is no interesting "text/html" in clipboard.
                    // Pass through to default "insertData" so that "text/plain" is used if available.
                    return insertData(data);
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

            insertData(data);
        };

        return editor;
    };
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
