import { Element, Node } from 'slate';

import { PLACEHOLDER_MENTION_TYPE } from '../constants';
import { PlaceholderMentionElementType } from '../types';

const isPlaceholderMentionElement = (node: Node): node is PlaceholderMentionElementType =>
    Element.isElement(node) &&
    node.type === PLACEHOLDER_MENTION_TYPE &&
    typeof node.key === 'string' &&
    node.key.length > 0;

export default isPlaceholderMentionElement;
