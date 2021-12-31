import type { LinkNode } from '@prezly/slate-types';
import type { Editor, Path } from 'slate';
import { Transforms } from 'slate';

function updateLinkHref(editor: Editor, at: Path, href: string) {
    return Transforms.setNodes<LinkNode>(editor, { href }, { at });
}

export default updateLinkHref;
