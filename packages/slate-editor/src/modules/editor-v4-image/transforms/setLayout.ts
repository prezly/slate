import { ImageLayout, isImageNode } from '@prezly/slate-types';
import { Editor, Node, Transforms } from 'slate';

const setLayout = (editor: Editor, layout: ImageLayout) => {
    /**
     * The `Partial<Node>` type-cast is a temporary solution until `Transforms.setNodes()` spec is fixed.
     * @see https://github.com/ianstormtaylor/slate/pull/4638
     * TODO: Remove the type-cast once the patch is released with the next Slate update.
     */
    Transforms.setNodes(editor, { layout } as Partial<Node>, { match: isImageNode });
};

export default setLayout;
