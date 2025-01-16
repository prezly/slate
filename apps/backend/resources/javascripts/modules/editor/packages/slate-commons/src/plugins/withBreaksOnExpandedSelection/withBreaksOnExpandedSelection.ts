/* eslint-disable no-param-reassign */
import { RangeApi, type SlateEditor } from '@udecode/plate';

import { insertEmptyParagraph, isBlock } from '../../commands';

export function withBreaksOnExpandedSelection<T extends SlateEditor>(editor: T): T {
    const { insertBreak } = editor.tf;

    editor.tf.insertBreak = () => {
        if (editor.selection && RangeApi.isExpanded(editor.selection)) {
            /**
             * A fix for inserting a break on an expanded selection, for example, selecting
             * multiple blocks.
             * We have to do it manually because there is a bug in Slate at
             * insertBreak -> splitNodes -> deleteRange -> Transforms.removeNodes
             * When `Transforms.removeNodes` is fixed in Slate, we can re-consider if we still
             * need this workaround.
             *
             * The reason is that `Transforms.removeNodes` seems to handle paths incorrectly
             * which causes multi-node removing to remove different paths.
             * See our bug report: ch-20170
             */

            /**
             * The code to find `nodes` is taken from `Transforms.removeNodes`.
             * @see https://github.com/ianstormtaylor/slate/blob/b616e75d6/packages/slate/src/transforms/node.ts#L418
             */
            const nodes = Array.from(
                editor.api.nodes({
                    at: editor.selection,
                    match: (node) => isBlock(editor, node),
                    mode: 'highest',
                    voids: true,
                }),
            );

            /**
             * We have to find all pathRefs first, before doing any changes to the editor.
             * Otherwise the paths point to the invalid location, causing the reported bug.
             */
            const pathRefs = nodes.map(([, path]) => editor.api.pathRef(path));
            pathRefs.forEach((pathRef) => {
                const path = pathRef.unref();
                if (path) {
                    editor.tf.removeNodes({ at: path });
                }
            });

            /**
             * In every editor, pressing Enter on an expanded selection inserts 2 breaks: one for
             * the removed content and one for the requested break.
             */
            insertEmptyParagraph(editor);
            insertEmptyParagraph(editor);
            return;
        }

        insertBreak();
    };

    return editor;
}
