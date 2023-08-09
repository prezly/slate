import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import type { ButtonBlockNode } from '../ButtonBlockNode';

import { Button } from './Button/Button';

interface Props extends RenderElementProps {
    element: ButtonBlockNode;
    withNewTabOption: boolean;
}

export function ButtonBlockElement({ attributes, children, element }: Props) {
    const { layout: buttonLayout } = element;

    const align = buttonLayout === 'full-width' ? 'center' : buttonLayout;
    const layout = buttonLayout === 'full-width' ? 'full-width' : 'contained';

    return (
        <EditorBlock
            {...attributes}
            element={element}
            align={align}
            layout={layout}
            overlay="autohide"
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderReadOnlyFrame={() => <Button node={element} />}
            width={layout === 'contained' ? 'min-content' : undefined}
            rounded
            void
        />
    );
}
