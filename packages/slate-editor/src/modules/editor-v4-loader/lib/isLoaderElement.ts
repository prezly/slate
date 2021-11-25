import { isElementNode } from '@prezly/slate-types';
import type { Node } from 'slate';

import { LOADER_TYPE } from '../constants';
import type { LoaderNode } from '../types';

const isLoaderElement = (node: Node): node is LoaderNode =>
    isElementNode<LoaderNode>(node, LOADER_TYPE);

export default isLoaderElement;
