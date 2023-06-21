/* eslint-disable no-param-reassign */

import { cleanDocx } from '@prezly/docx-cleaner';
import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';
import { Element } from 'slate';

import { createDataTransfer } from '#lib';

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

export function withDeserializeHtml(
    getExtensions: () => Extension[],
    /**
     * This is useful when debugging with https://github.com/prezly/slate-pasting-events-data
     * Just go to where "withDeserializeHtml" is called and pass an extra argument to it
     * with the data acquired via slate-pasting-events-data tool and voilà - all your paste
     * events will use that fake data now. Happy debugging!
     */
    debugDataOverride?: Parameters<typeof createDataTransfer>[0],
) {
    return function <T extends Editor>(editor: T) {
        const { insertData } = editor;

        function handleError(error: unknown) {
            return EventsEditor.dispatchEvent(editor, 'error', error);
        }

        editor.insertData = function (dataTransfer) {
            const data = debugDataOverride ? createDataTransfer(debugDataOverride) : dataTransfer;
            const slateFragment = data.getData('application/x-slate-fragment');

            EventsEditor.dispatchEvent(editor, 'paste', {
                isEmpty: EditorCommands.isEmpty(editor),
                pastedLength: data.getData('text/plain').length,
            });

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

                // If there are no "nodes" then there is no interesting "text/html" in clipboard.
                // Pass through to default "insertData" so that "text/plain" is used if available.
                if (
                    nodes.length === 1 &&
                    Element.isElement(nodes[0]) &&
                    editor.isBlock(nodes[0]) &&
                    !editor.isRichBlock(nodes[0])
                ) {
                    EditorCommands.insertNodes(editor, nodes[0].children, {
                        ensureEmptyParagraphAfter: true,
                        mode: 'highest',
                    });
                    return;
                } else if (nodes.length > 0) {
                    EditorCommands.insertNodes(editor, nodes, {
                        ensureEmptyParagraphAfter: true,
                        mode: 'highest',
                    });
                    return;
                }
            }

            insertData(data);
        };

        return editor;
    };
}
