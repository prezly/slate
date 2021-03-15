import { Editor, Range, Transforms } from 'slate';

const setImageHref = (editor: Editor, at: Range, href: string) => {
    Transforms.setNodes(editor, { href }, { at });
};

export default setImageHref;
