import { ImageNode } from '@prezly/slate-types';
import { Editor, Range, Transforms } from 'slate';

const setImageHref = (editor: Editor, at: Range, href: string) => {
    Transforms.setNodes<ImageNode>(editor, { href }, { at });
};

export default setImageHref;
