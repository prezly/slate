import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Element } from 'slate';
import { Transforms } from 'slate';

import { findLoaderPath, isLoaderElement } from '../lib';
import type { LoaderNode } from '../types';

export function replaceLoader(editor: Editor, loader: LoaderNode, element: Element): void {
    const loaderPath = findLoaderPath(editor, loader.id);

    if (!loaderPath) return;

    const wasSelected = EditorCommands.isTopLevelNodeSelected(editor, loader);

    Transforms.removeNodes(editor, {
        at: loaderPath,
        match: (node) => isLoaderElement(node) && node.id === loader.id,
    });

    Transforms.insertNodes(editor, element, {
        at: loaderPath,
        mode: 'highest',
    });

    if (wasSelected) Transforms.select(editor, loaderPath);
}
