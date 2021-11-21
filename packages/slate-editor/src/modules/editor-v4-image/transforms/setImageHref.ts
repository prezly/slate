import type { ImageNode } from '@prezly/slate-types';
import type { Editor, Range } from 'slate';
import { Transforms } from 'slate';

const setImageHref = (editor: Editor, at: Range, href: string) => {
    Transforms.setNodes<ImageNode>(editor, { href }, { at });
};

export default setImageHref;
