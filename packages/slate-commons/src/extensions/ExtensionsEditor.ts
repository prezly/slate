import type { BaseEditor, Descendant, Element } from 'slate';

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
     * Convert internal editor document value for external consumers.
     * This is a convenient location for removing runtime-only editor elements
     * to prevent the outer systems from persisting temporary data.
     */
    serialize(nodes: Descendant[]): Descendant[];
}

export function withExtensions<T extends BaseEditor>(
    editor: T,
    extensions: Extension[] = [],
): T & ExtensionsEditor {
    const parent = {
        isInline: editor.isInline,
        isVoid: editor.isVoid,
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
    } satisfies Partial<BaseEditor & ExtensionsEditor>);

    return extensionsEditor;
}
