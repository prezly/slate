import { type NodeEntry, Editor, Element, Transforms } from 'slate';

import { isEqual, reject } from '#lodash';

import { createEntryPoint, isEntryPoint } from './EntryPointNode';

export function insertInitialEntryPoint(editor: Editor, [node, path]: NodeEntry): boolean {
    if (path.length === 0 && Editor.isEditor(node)) {
        const [firstNode] = node.children;
        if (!isEntryPoint(firstNode) && isInitialEntryPointRequired(editor)) {
            Transforms.insertNodes(editor, createEntryPoint(), { at: [0] });
            return true;
        }
    }
    return false;
}

export function deleteUnnecessaryInitialEntryPoint(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (path.length === 0 && Editor.isEditor(node)) {
        const [firstNode] = node.children;
        if (isEntryPoint(firstNode) && !isInitialEntryPointRequired(editor)) {
            console.log('Transforms.delete()', { at: [0] });
            Transforms.delete(editor, { at: [0] });
            return true;
        }
    }
    return false;
}

export function convertNonEmptyInitialEntryPoint(editor: Editor, [node, path]: NodeEntry): boolean {
    if (isEntryPoint(node)) {
        if (node.children.length !== 1 || !isEqual(node.children, [{ text: '' }])) {
            Transforms.setNodes(editor, editor.createDefaultTextNode(), {
                match: isEntryPoint,
                at: path,
            });
            return true;
        }
    }
    return false;
}

export function convertAdditionalEntryPoints(editor: Editor, [node, path]: NodeEntry): boolean {
    if (Editor.isEditor(node)) {
        for (const [index, child] of node.children.entries()) {
            if (index > 0 && isEntryPoint(child)) {
                Transforms.setNodes(editor, editor.createDefaultTextNode(), {
                    match: isEntryPoint,
                    at: [...path, index],
                });
                return true;
            }
        }
        return false;
    }
    return false;
}

export function deleteNestedInitialEntryPoint(editor: Editor, [node, path]: NodeEntry): boolean {
    if (path.length > 0 && Element.isElement(node)) {
        for (const [index, child] of node.children.entries()) {
            if (isEntryPoint(child)) {
                Transforms.delete(editor, {
                    at: [...path, index],
                });
                return true;
            }
        }
    }
    return false;
}

function isInitialEntryPointRequired(editor: Editor): boolean {
    const [firstNode] = reject(editor.children, isEntryPoint);

    return (
        Element.isElement(firstNode) && (editor.isRichBlock(firstNode) || editor.isVoid(firstNode))
    );
}
