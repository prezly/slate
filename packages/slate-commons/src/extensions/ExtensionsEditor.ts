import { isNotUndefined } from '@technically/is-not-undefined';
import type { RefObject } from 'react';
import type { BaseEditor, Descendant, Editor, Element, Node, TextUnit } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

import type {
    AdditionalEditorMethods,
    EditorMethodsHooks,
    EditorRenderHooks,
} from '../types/Extension'; // a deep import is necessary to keep cominterfaces package-scoped

export interface ExtensionsEditor extends BaseEditor {
    /**
     * Method hooks are separate to not trigger a re-render, when changed.
     */
    methodHooks: RefObject<EditorMethodsHooks & AdditionalEditorMethods>[];
    /**
     * Render hooks are separate to force a re-render, when changed.
     */
    renderHooks: EditorRenderHooks[];

    /**
     * Compare two elements.
     *
     * This is useful to implement smarter comparison rules to,
     * for example, ignore data-independent properties like `uuid`.
     *
     * `children` arrays can be omitted from the comparison,
     * as the outer code will compare them anyway.
     */
    isElementEqual(node: Element, another: Element): boolean | undefined;

    /**
     * Tell the Editor that the block is not a simple blob of styled text
     * and is instead a typeof of rich block with additional decorations.
     * Like, cards, or interactive elements.
     */
    isRichBlock(node: Node): boolean;

    /**
     * Convert internal editor document value for external consumers.
     * This is a convenient location for removing runtime-only editor elements
     * to prevent the outer systems from persisting temporary data.
     */
    serialize(nodes: Descendant[]): Descendant[];
}

export function withExtensions<T extends BaseEditor & ReactEditor & HistoryEditor>(
    editor: T,
): T & ExtensionsEditor {
    const parent = {
        deleteBackward: editor.deleteBackward,
        deleteForward: editor.deleteForward,
        isInline: editor.isInline,
        isVoid: editor.isVoid,
        insertBreak: editor.insertBreak,
        insertData: editor.insertData,
        insertText: editor.insertText,
        normalizeNode: editor.normalizeNode,
        getFragment: editor.getFragment,
        setFragmentData: editor.setFragmentData,
        undo: editor.undo,
        redo: editor.redo,
    } satisfies Partial<Editor & ReactEditor & HistoryEditor>;

    const methodsHooks = {
        deleteBackward(unit) {
            const handlers = extensionsEditor.methodHooks
                .map((hook) => hook.current?.deleteBackward)
                .filter(isNotUndefined);

            function next(unit: TextUnit) {
                const handler = handlers.shift();
                if (handler) {
                    handler(unit, next);
                } else {
                    parent.deleteBackward(unit);
                }
            }

            next(unit);
        },
        deleteForward(unit) {
            const handlers = extensionsEditor.methodHooks
                .map((hook) => hook.current?.deleteForward)
                .filter(isNotUndefined);

            function next(unit: TextUnit) {
                const handler = handlers.shift();
                if (handler) {
                    handler(unit, next);
                } else {
                    parent.deleteForward(unit);
                }
            }

            next(unit);
        },
        isInline(element) {
            for (const hook of extensionsEditor.methodHooks) {
                if (hook.current?.isInline?.(element)) {
                    return true;
                }
            }

            return parent.isInline(element);
        },
        isVoid(element) {
            for (const hook of extensionsEditor.methodHooks) {
                if (hook.current?.isVoid?.(element)) {
                    return true;
                }
            }

            return parent.isVoid(element);
        },
        insertBreak() {
            for (const hook of extensionsEditor.methodHooks) {
                if (hook.current?.insertBreak?.()) {
                    return;
                }
            }
            parent.insertBreak();
        },
        insertData(dataTransfer) {
            const handlers = extensionsEditor.methodHooks
                .map((hook) => hook.current?.insertData)
                .filter(isNotUndefined);

            function next(dataTransfer: DataTransfer) {
                const handler = handlers.shift();
                if (handler) {
                    handler(dataTransfer, next);
                } else {
                    parent.insertData(dataTransfer);
                }
            }

            next(dataTransfer);
        },
        insertText(text) {
            const handlers = extensionsEditor.methodHooks
                .map((hook) => hook.current?.insertText)
                .filter(isNotUndefined);

            function next(text: string) {
                const handler = handlers.shift();
                if (handler) {
                    handler(text, next);
                } else {
                    parent.insertText(text);
                }
            }

            next(text);
        },
        normalizeNode(entry) {
            const normalizers = extensionsEditor.methodHooks.flatMap(
                (hook) => hook.current?.normalizeNode ?? [],
            );

            for (const normalizer of normalizers) {
                const normalized = normalizer(editor, entry);

                if (normalized) {
                    return;
                }
            }

            return parent.normalizeNode(entry);
        },
        getFragment() {
            const handlers = extensionsEditor.methodHooks
                .map((hook) => hook.current?.getFragment)
                .filter(isNotUndefined);

            function next() {
                const handler = handlers.shift();
                if (handler) {
                    return handler(next);
                } else {
                    return parent.getFragment();
                }
            }

            return next();
        },
        setFragmentData(dataTransfer: DataTransfer, originEvent?: 'drag' | 'copy' | 'cut') {
            const handlers = extensionsEditor.methodHooks
                .map((hook) => hook.current?.setFragmentData)
                .filter(isNotUndefined);

            function next(dataTransfer: DataTransfer) {
                const handler = handlers.shift();
                if (handler) {
                    handler(dataTransfer, next);
                } else {
                    parent.setFragmentData(dataTransfer, originEvent);
                }
            }

            next(dataTransfer);
        },
        undo() {
            const handlers = extensionsEditor.methodHooks
                .map((hook) => hook.current?.undo)
                .filter(isNotUndefined);

            function next() {
                const handler = handlers.shift();
                if (handler) {
                    handler(next);
                } else {
                    parent.undo();
                }
            }

            next();
        },
        redo() {
            const handlers = extensionsEditor.methodHooks
                .map((hook) => hook.current?.redo)
                .filter(isNotUndefined);

            function next() {
                const handler = handlers.shift();
                if (handler) {
                    handler(next);
                } else {
                    parent.redo();
                }
            }

            next();
        },
    } satisfies Pick<Editor & ReactEditor & HistoryEditor, keyof EditorMethodsHooks>;

    const extensionsEditor: T & ExtensionsEditor = Object.assign(editor, {
        methodHooks: [],
        renderHooks: [],
        isElementEqual(node, another): boolean | undefined {
            for (const hook of extensionsEditor.methodHooks) {
                const ret = hook.current?.isElementEqual?.(node, another);
                if (typeof ret !== 'undefined') {
                    return ret;
                }
            }
            return undefined;
        },
        isRichBlock(node): boolean {
            for (const hook of extensionsEditor.methodHooks) {
                if (hook.current?.isRichBlock?.(node)) {
                    return true;
                }
            }
            return false;
        },
        serialize(nodes) {
            return extensionsEditor.methodHooks.reduce(
                (result, hook) => hook.current?.serialize?.(result) ?? result,
                nodes,
            );
        },
        ...methodsHooks,
    } satisfies Omit<ExtensionsEditor, keyof Editor>);

    return extensionsEditor;
}
