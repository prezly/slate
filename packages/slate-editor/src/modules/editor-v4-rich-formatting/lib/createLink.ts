import { LinkNode } from '@prezly/slate-types';
import { Text } from 'slate';

import { ElementType } from '../types';

const createLink = (href: string, children: Text[] = []): LinkNode => ({
    children,
    href,
    type: ElementType.LINK,
});

export default createLink;
