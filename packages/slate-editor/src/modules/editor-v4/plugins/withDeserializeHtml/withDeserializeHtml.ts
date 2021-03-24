/* eslint-disable no-param-reassign */

import { cleanDocx } from '@prezly/docx-cleaner';
import { EditorCommands, Extension } from '@prezly/slate-commons';
import { ReactEditor } from 'slate-react';

import { EventsEditor } from '../../../../modules/editor-v4-events';
import { createDataTransfer } from '../../lib';

import deserializeHtml from './deserializeHtml';

const tryCleanDocx = (html: string, rtf: string, onError: (error: Error) => void): string => {
    try {
        return cleanDocx(html, rtf);
    } catch (error) {
        onError(error);
        return html;
    }
};

const withDeserializeHtml = (
    getExtensions: () => Extension[],
    /**
     * This is useful when debugging with https://github.com/prezly/slate-pasting-events-data
     * Just go to where "withDeserializeHtml" is called and pass an extra argument to it
     * with the data acquired via slate-pasting-events-data tool and voilà - all your paste
     * events will use that fake data now. Happy debugging!
     */
    debugDataOverride?: Parameters<typeof createDataTransfer>[0],
) => {
    return <T extends ReactEditor>(editor: T) => {
        const { insertData } = editor;

        editor.insertData = (dataTransfer) => {
            const data = debugDataOverride ? createDataTransfer(debugDataOverride) : dataTransfer;
            const html = data.getData('text/html');
            const slateFragment = data.getData('application/x-slate-fragment');

            EventsEditor.dispatchEvent(editor, 'paste', {
                isEmpty: EditorCommands.isEmpty(editor),
                pastedLength: data.getData('text/plain').length,
                slateVersion: process.env.SLATE_VERSION,
            });

            if (html && !slateFragment) {
                const handleError = (error: Error) => {
                    EventsEditor.dispatchEvent(editor, 'error', error);
                };
                const rtf = data.getData('text/rtf');
                const cleanHtml = tryCleanDocx(html, rtf, handleError);
                const extensions = getExtensions();
                const nodes = deserializeHtml(extensions, cleanHtml, handleError);

                // If there are no "nodes" then there is no interesting "text/html" in clipboard.
                // Pass through to default "insertData" so that "text/plain" is used if available.
                if (nodes.length > 0) {
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
};

export default withDeserializeHtml;
