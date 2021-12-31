/* eslint-disable no-param-reassign */
import { Editor, Range, Transforms } from 'slate';

import { insertEmptyParagraph } from '../../commands';

function withBreaksOnExpandedSelection<T extends Editor>(editor: T): T {
    const { insertBreak } = editor;

    editor.insertBreak = () => {
        if (editor.selection && Range.isExpanded(editor.selection)) {
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
             * See our bug report: https://app.clubhouse.io/prezly/story/20170
             */

            /**
             * The code to find `nodes` is taken from `Transforms.removeNodes`.
             * https://github.com/ianstormtaylor/slate/blob/
             * b616e75d636733733503c724c9084ff53e88dde8/packages/slate/src/transforms/node.ts#L418
             */
            const nodes = Array.from(
                Editor.nodes(editor, {
                    at: editor.selection,
                    match: (node) => Editor.isBlock(editor, node),
                    mode: 'highest',
                    voids: true,
                }),
            );

            /**
             * We have to find all pathRefs first, before doing any changes to the editor.
             * Otherwise the paths point to the invalid location, causing the reported bug.
             */
            const pathRefs = nodes.map(([, path]) => Editor.pathRef(editor, path));
            pathRefs.forEach((pathRef) => {
                const path = pathRef.unref();
                if (path) {
                    Transforms.removeNodes(editor, { at: path });
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

export default withBreaksOnExpandedSelection;
