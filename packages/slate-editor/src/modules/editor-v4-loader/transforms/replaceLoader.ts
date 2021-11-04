import { Editor, Element, Transforms } from 'slate';

import { findLoaderPath, isLoaderElement } from '../lib';
import { LoaderNode } from '../types';

const replaceLoader = (editor: Editor, loader: LoaderNode, element: Element): void => {
    const loaderPath = findLoaderPath(editor, loader.id);

    if (!loaderPath) {
        return;
    }

    Transforms.removeNodes(editor, {
        at: loaderPath,
        match: (node) => isLoaderElement(node) && node.id === loader.id,
    });

    Transforms.insertNodes(editor, element, {
        at: loaderPath,
        mode: 'highest',
    });
};

export default replaceLoader;
