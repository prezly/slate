import type { RenderElement } from '@prezly/slate-commons';
import React from 'react';
import type { Editor, Node } from 'slate';
import { Element } from 'slate';
import type { RenderElementProps } from 'slate-react';

export function combineRenderElement(editor: Editor, renderElementFns: RenderElement[]) {
    return function combined({ attributes, children, element }: RenderElementProps) {
        const props = {
            attributes: {
                'data-slate-block': detectBlockType(editor, element),
                'data-slate-type': element.type,
                'data-slate-value': JSON.stringify(element),
                ...attributes,
            },
            children,
            element,
        };

        for (const renderElement of renderElementFns) {
            const ret = renderElement(props);
            if (typeof ret !== 'undefined') {
                return ret;
            }
        }

        return <div {...props.attributes}>{props.children}</div>;
    };
}

function detectBlockType(editor: Editor, element: Node): string | undefined {
    if (!Element.isElement(element) || editor.isInline(element)) {
        return undefined;
    }
    return editor.isRichBlock(element) ? 'rich' : 'regular';
}
