import { Element, Node } from 'slate';

import { USER_MENTION_TYPE } from '../constants';
import { UserMentionElementType } from '../types';

import isUser from './isUser';

const isUserMentionElement = (node: Node): node is UserMentionElementType =>
    Element.isElement(node) && node.type === USER_MENTION_TYPE && isUser(node.user);

export default isUserMentionElement;
