import type { Extension } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';
import type { Element } from 'slate';

export interface ElementsEqualityCheckEditor {
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
}

export function withElementsEqualityCheck(getExtensions: () => Extension[]) {
    return function <T extends SlateEditor>(editor: T): T & ElementsEqualityCheckEditor {
        function isElementEqual(node: Element, another: Element): boolean | undefined {
            for (const extension of getExtensions()) {
                const ret = extension.isElementEqual?.(node, another);
                if (typeof ret !== 'undefined') {
                    return ret;
                }
            }
            return undefined;
        }

        return Object.assign(editor, {
            isElementEqual,
        });
    };
}
