import { Element, Node } from 'slate';

import { EMBED_TYPE } from '../constants';
import { EmbedElementType } from '../types';

import isOEmbedInfo from './isOEmbedInfo';

const isEmbedElement = (node: Node): node is EmbedElementType =>
    Element.isElement(node) &&
    node.type === EMBED_TYPE &&
    isOEmbedInfo(node.oembed) &&
    typeof node.url === 'string' &&
    node.url.length > 0 &&
    typeof node.uuid === 'string' &&
    node.uuid.length > 0;

export default isEmbedElement;
