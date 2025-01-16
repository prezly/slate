import type { Extension, RenderLeaf } from '@prezly/slate-commons';
import { type RenderLeafProps } from '@udecode/plate';
import React from 'react';

export function combineRenderLeaf(extensions: Extension[], renderLeafList: RenderLeaf[]) {
    return function RenderLeaf({ attributes, children, leaf, text }: RenderLeafProps) {
        for (const renderLeaf of renderLeafList) {
            children = renderLeaf({ attributes, children, leaf, text });
        }

        for (const { renderLeaf } of extensions) {
            if (renderLeaf) {
                children = renderLeaf({ attributes, children, leaf, text });
            }
        }

        return <span {...attributes}>{children}</span>;
    };
}
