import type { Extension, RenderElement } from '@prezly/slate-commons';
import { ElementApi, type Node, type RenderElementProps, type SlateEditor } from '@udecode/plate';
import React from 'react';

export function combineRenderElement(
    editor: SlateEditor,
    extensions: Extension[],
    renderElementList: RenderElement[],
) {
    return function combinedRenderElement({ attributes, children, element }: RenderElementProps) {
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
        for (const renderElement of renderElementList) {
            const ret = renderElement(props);
            if (ret) return ret;
        }

        for (const { renderElement } of extensions) {
            const ret = renderElement?.(props);
            if (ret) return ret;
        }

        return <div {...props.attributes}>{props.children}</div>;
    };
}

function detectBlockType(editor: SlateEditor, element: Node): string | undefined {
    if (!ElementApi.isElement(element) || editor.api.isInline(element)) {
        return undefined;
    }
    return editor.isRichBlock(element) ? 'rich' : 'regular';
}
