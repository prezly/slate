import type { HtmlNode } from '@prezly/slate-types';
import type { PropsWithChildren } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

interface Props extends RenderElementProps {
    element: HtmlNode;
}

export function HtmlElement({ attributes, children, element }: PropsWithChildren<Props>) {
    return (
        <EditorBlock
            {...attributes} // contains `ref`
            element={element}
            extendedHitArea
            renderFrame={() => <pre>{element.content}</pre>}
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
}
