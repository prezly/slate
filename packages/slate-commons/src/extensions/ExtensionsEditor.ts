import { isNotUndefined } from '@technically/is-not-undefined';
import type { BaseEditor, Descendant, Element, Node } from 'slate';
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

export function withExtensions<T extends BaseEditor & ReactEditor>(
    editor: T,
    extensions: Extension[] = [],
): T & ExtensionsEditor {
    const parent = {
        isInline: editor.isInline,
        isVoid: editor.isVoid,
        insertData: editor.insertData,
        normalizeNode: editor.normalizeNode,
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
    } satisfies Partial<BaseEditor & ReactEditor & ExtensionsEditor>);

    return extensionsEditor;
}
