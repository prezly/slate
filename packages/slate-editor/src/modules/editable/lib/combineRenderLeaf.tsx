import type { RenderLeaf } from '@prezly/slate-commons';
import React from 'react';
import type { RenderLeafProps } from 'slate-react';

export function combineRenderLeaf(renderLeafFns: RenderLeaf[]) {
    return function combined({ attributes, children, leaf, text }: RenderLeafProps) {
        for (const renderLeaf of renderLeafFns) {
            children = renderLeaf({ attributes, children, leaf, text });
        }

        return <span {...attributes}>{children}</span>;
    };
}
