import React, { useCallback } from 'react';
import { useSlateStatic, type RenderElementProps } from 'slate-react';

import { EditorBlock } from '#components';

import type { ButtonBlockNode } from '../ButtonBlockNode';
import { removeButtonBlock, updateButtonBlock } from '../transforms';

import { Button } from './Button/Button';
import { ButtonMenu, type FormState } from './ButtonBlockMenu';

interface Props extends RenderElementProps {
    element: ButtonBlockNode;
    withNewTabOption: boolean;
}

export function ButtonBlockElement({ attributes, children, element, withNewTabOption }: Props) {
    const editor = useSlateStatic();

    const { layout: buttonLayout } = element;

    const align = buttonLayout === 'full-width' ? 'center' : buttonLayout;
    const layout = buttonLayout === 'full-width' ? 'full-width' : 'contained';

    const handleUpdate = useCallback(
        function (patch: Partial<FormState>) {
            updateButtonBlock(editor, patch);
        },
        [editor, element],
    );

    const handleRemove = useCallback(
        function () {
            removeButtonBlock(editor);
        },
        [editor, element],
    );

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
            renderMenu={({ onClose }) => (
                <ButtonMenu
                    onClose={onClose}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                    value={{
                        href: element.href,
                        label: element.label,
                        layout: element.layout,
                        new_tab: element.new_tab,
                        variant: element.variant,
                    }}
                    withNewTabOption={withNewTabOption}
                />
            )}
            width={layout === 'contained' ? 'min-content' : undefined}
            rounded
            void
        />
    );
}
