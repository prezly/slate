import { isNotUndefined } from '@technically/is-not-undefined';
import type { BaseEditor, Descendant, Element, Node } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

import type { Extension } from '../types';

export interface ExtensionsEditor extends BaseEditor {
    extensions: Extension[];

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
    extensions: Extension[] = [],
): T & ExtensionsEditor {
    const parent = {
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
    };
    const extensionsEditor: T & ExtensionsEditor = Object.assign(editor, {
        extensions,
        isElementEqual(node, another): boolean | undefined {
            for (const extension of extensionsEditor.extensions) {
                const ret = extension.isElementEqual?.(node, another);
                if (typeof ret !== 'undefined') {
                    return ret;
                }
            }
            return undefined;
        },
        isInline(element) {
            for (const extension of extensionsEditor.extensions) {
                if (extension.isInline?.(element)) {
                    return true;
                }
            }

            return parent.isInline(element);
        },
        isVoid(element) {
            for (const extension of extensionsEditor.extensions) {
                if (extension.isVoid?.(element)) {
                    return true;
                }
            }

            return parent.isVoid(element);
        },
        isRichBlock(node): boolean {
            for (const extension of extensionsEditor.extensions) {
                if (extension.isRichBlock?.(node)) {
                    return true;
                }
            }
            return false;
        },
        insertBreak() {
            for (const extension of extensionsEditor.extensions) {
                if (extension.insertBreak?.()) {
                    return;
                }
            }
            parent.insertBreak();
        },
        insertData(dataTransfer) {
            const handlers = extensionsEditor.extensions
                .map((ext) => ext.insertData)
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
            const handlers = extensionsEditor.extensions
                .map((ext) => ext.insertText)
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
            const normalizers = extensionsEditor.extensions.flatMap(
                (ext) => ext.normalizeNode ?? [],
            );

            for (const normalizer of normalizers) {
                const normalized = normalizer(editor, entry);

                if (normalized) {
                    return;
                }
            }

            return parent.normalizeNode(entry);
        },
        serialize(nodes) {
            return extensionsEditor.extensions.reduce(
                (result, extension) => extension.serialize?.(result) ?? result,
                nodes,
            );
        },
        getFragment() {
            const handlers = extensionsEditor.extensions
                .map((ext) => ext.getFragment)
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
            const handlers = extensionsEditor.extensions
                .map((ext) => ext.setFragmentData)
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
            const handlers = extensionsEditor.extensions
                .map((ext) => ext.undo)
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
            const handlers = extensionsEditor.extensions
                .map((ext) => ext.redo)
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
    } satisfies Partial<BaseEditor & ReactEditor & HistoryEditor & ExtensionsEditor>);

    return extensionsEditor;
}
