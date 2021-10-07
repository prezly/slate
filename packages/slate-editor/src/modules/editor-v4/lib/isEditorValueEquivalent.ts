import { BlockNode } from '@prezly/slate-types';

import deserialize from './deserialize';
import serialize from './serialize';

const isEditorValueEquivalent = (a: string | BlockNode[], b: string | BlockNode[]): boolean => {
    const aContent = typeof a === 'string' ? deserialize(a) : a;
    const bContent = typeof b === 'string' ? deserialize(b) : b;
    return serialize(aContent) === serialize(bContent);
};

export default isEditorValueEquivalent;
