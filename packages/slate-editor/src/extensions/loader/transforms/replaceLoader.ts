import { type Element, Editor } from 'slate';
import { Transforms } from 'slate';

import { findLoaderPath, isLoaderElement } from '../lib';
import type { LoaderNode } from '../types';

export function replaceLoader(editor: Editor, loader: LoaderNode, element: Element, shouldFocus = true): void {
    const loaderPath = findLoaderPath(editor, loader.id);

    if (!loaderPath) return;

    Editor.withoutNormalizing(editor, () => {
        Transforms.removeNodes(editor, {
            at: loaderPath,
            match: (node) => isLoaderElement(node) && node.id === loader.id,
        });

        Transforms.insertNodes(editor, element, {
            at: loaderPath,
            mode: 'highest',
        });

        if (shouldFocus) {
            Transforms.select(editor, loaderPath);
        }
    });
}
