import { LinkNode } from '@prezly/slate-types';
import { Editor, Path, Transforms } from 'slate';

const updateLinkHref = (editor: Editor, at: Path, href: string) => {
    Transforms.setNodes<LinkNode>(editor, { href }, { at });
};

export default updateLinkHref;
