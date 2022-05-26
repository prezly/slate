import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { Extension, RenderElement } from '../types';

export function combineRenderElement(
    extensions: Extension[],
    renderElementList: RenderElement[],
) {
    return function combinedRenderElement(props: RenderElementProps) {
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
