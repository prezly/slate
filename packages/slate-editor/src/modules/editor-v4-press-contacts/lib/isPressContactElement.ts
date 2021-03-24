import { Element, Node } from 'slate';

import { PRESS_CONTACT_TYPE } from '../constants';
import { PressContactElementType } from '../types';

import isPressContact from './isPressContact';

const isPressContactElement = (node: Node): node is PressContactElementType =>
    Element.isElement(node) &&
    node.type === PRESS_CONTACT_TYPE &&
    isPressContact(node.contact) &&
    typeof node.uuid === 'string' &&
    node.uuid.length > 0;

export default isPressContactElement;
