import type { Extension, RenderElement } from '@prezly/slate-commons';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

export function combineRenderElement(
    extensions: Extension[],
    renderElementList: RenderElement[],
) {
    return function combinedRenderElement({ attributes, children, element }: RenderElementProps) {
        const props = {
            attributes: {
                'data-slate-type': (element as any).type,
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
