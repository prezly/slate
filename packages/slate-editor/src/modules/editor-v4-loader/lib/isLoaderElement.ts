import { Element, Node } from 'slate';

import { LOADER_TYPE } from '../constants';
import { LoaderElementType } from '../types';

const isLoaderElement = (node: Node): node is LoaderElementType =>
    Element.isElement(node) && node.type === LOADER_TYPE;

export default isLoaderElement;
