import { isElementNode } from '@prezly/slate-types';
import { Node } from 'slate';

import { LOADER_TYPE } from '../constants';
import { LoaderNode } from '../types';

const isLoaderElement = (node: Node): node is LoaderNode =>
    isElementNode<LoaderNode>(node, LOADER_TYPE);

export default isLoaderElement;
