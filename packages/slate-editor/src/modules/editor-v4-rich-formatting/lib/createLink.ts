import { Node } from 'slate';

import { ElementType, LinkElementType } from '../types';

const createLink = (href: string, children: Node[] = []): LinkElementType => ({
    children,
    href,
    type: ElementType.LINK,
});

export default createLink;
