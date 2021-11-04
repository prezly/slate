import { isElementNode } from '@prezly/slate-types';
import { Node } from 'slate';

import { LOADER_TYPE } from '../constants';
import { LoaderElementType } from '../types';

const isLoaderElement = (node: Node): node is LoaderElementType =>
    isElementNode<LoaderElementType>(node, LOADER_TYPE);

export default isLoaderElement;
