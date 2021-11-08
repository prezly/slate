import { ImageNode } from '@prezly/slate-types';
import { Editor, Node, Range, Transforms } from 'slate';

const setImageHref = (editor: Editor, at: Range, href: string) => {
    /**
     * The `Partial<Node>` type-cast is a temporary solution until `Transforms.setNodes()` spec is fixed.
     * @see https://github.com/ianstormtaylor/slate/pull/4638
     * TODO: Remove the type-cast once the patch is released with the next Slate update.
     */
    Transforms.setNodes<ImageNode>(editor, { href } as Partial<Node>, { at });
};

export default setImageHref;
