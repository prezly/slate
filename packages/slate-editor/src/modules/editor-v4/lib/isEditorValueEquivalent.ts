import { Node } from 'slate';

import deserialize from './deserialize';
import serialize from './serialize';

const isEditorValueEquivalent = (a: string | Node[], b: string | Node[]): boolean => {
    const aContent = Node.isNodeList(a) ? a : deserialize(a);
    const bContent = Node.isNodeList(b) ? b : deserialize(b);
    return serialize(aContent) === serialize(bContent);
};

export default isEditorValueEquivalent;
