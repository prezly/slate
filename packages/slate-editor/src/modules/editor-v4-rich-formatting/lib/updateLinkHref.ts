import { Editor, Path, Transforms } from 'slate';

const updateLinkHref = (editor: Editor, at: Path, href: string) => {
    Transforms.setNodes(editor, { href }, { at });
};

export default updateLinkHref;
