import { type NodeEntry, Editor, Element, Transforms } from 'slate';

import { isEqual, reject } from '#lodash';

import { EntryPointNode } from './EntryPointNode';

export type ElementFactory = (props?: Partial<Element>) => Element;

const { createEntryPoint, isEntryPoint } = EntryPointNode;

export function insertLeadingEntryPoint(editor: Editor, [node, path]: NodeEntry): boolean {
    if (path.length === 0 && Editor.isEditor(node)) {
        const [firstNode] = node.children;
        if (firstNode && !isEntryPoint(firstNode) && isLeadingEntryPointRequired(editor)) {
            Transforms.insertNodes(editor, createEntryPoint(), { at: [0] });
            return true;
        }
    }
    return false;
}

export function insertTrailingEntryPoint(editor: Editor, [node, path]: NodeEntry): boolean {
    if (path.length === 0 && Editor.isEditor(node)) {
        const [lastNode] = node.children.slice(-1);
        if (lastNode && !isEntryPoint(lastNode) && isTrailingEntryPointRequired(editor)) {
            Transforms.insertNodes(editor, createEntryPoint(), {
                at: Editor.end(editor, []),
            });
            return true;
        }
    }
    return false;
}

export function deleteUnnecessaryEntryPoints(editor: Editor, [node, path]: NodeEntry): boolean {
    if (path.length === 0 && Editor.isEditor(node)) {
        const [firstNode] = node.children;
        if (firstNode && isEntryPoint(firstNode) && !isLeadingEntryPointRequired(editor)) {
            Transforms.delete(editor, { at: [0] });
            return true;
        }

        const [lastNode] = node.children.slice(-1);
        if (lastNode && isEntryPoint(lastNode) && !isTrailingEntryPointRequired(editor)) {
            Transforms.delete(editor, { at: [node.children.length - 1] });
            return true;
        }
    }
    return false;
}

export function convertNonEmptyEntryPoints(
    editor: Editor,
    [node, path]: NodeEntry,
    createDefaultTextElement: ElementFactory,
): boolean {
    if (isEntryPoint(node)) {
        if (
            node.children.length > 1 ||
            (node.children.length === 1 && !isEqual(node.children, [{ text: '' }]))
        ) {
            Transforms.setNodes(editor, createDefaultTextElement(), {
                match: isEntryPoint,
                at: path,
            });
            return true;
        }
    }
    return false;
}

export function convertAdditionalEntryPoints(
    editor: Editor,
    [node, path]: NodeEntry,
    createDefaultTextElement: ElementFactory,
): boolean {
    if (Editor.isEditor(node)) {
        for (const [index, child] of node.children.entries()) {
            if (index > 0 && isEntryPoint(child)) {
                Transforms.setNodes(editor, createDefaultTextElement(), {
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

export function deleteNestedEntryPoints(editor: Editor, [node, path]: NodeEntry): boolean {
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

function isLeadingEntryPointRequired(editor: Editor): boolean {
    const [firstNode] = reject(editor.children, isEntryPoint);

    return (
        firstNode &&
        Element.isElement(firstNode) &&
        (editor.isRichBlock(firstNode) || editor.isVoid(firstNode))
    );
}

function isTrailingEntryPointRequired(editor: Editor): boolean {
    const [lastNode] = reject(editor.children, isEntryPoint).slice(-1);

    return (
        lastNode &&
        Element.isElement(lastNode) &&
        (editor.isRichBlock(lastNode) || editor.isVoid(lastNode))
    );
}
