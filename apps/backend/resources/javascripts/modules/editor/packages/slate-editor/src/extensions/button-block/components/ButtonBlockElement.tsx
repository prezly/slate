import type * as Popper from '@popperjs/core';
import { useEditorRef } from '@udecode/plate-common/react';
import React, { useCallback } from 'react';
import { type RenderElementProps } from 'slate-react';

import type { InfoText } from '#components';
import { EditorBlock } from '#components';

import { EventsEditor } from '#modules/events';

import { ButtonBlockNode } from '../ButtonBlockNode';
import { removeButtonBlock, updateButtonBlock } from '../transforms';

import { Button } from './Button/Button';
import { ButtonMenu, type FormState } from './ButtonBlockMenu';

interface Props extends RenderElementProps {
    element: ButtonBlockNode;
    withNewTabOption: boolean;
    info?: InfoText.StructuredContent;
}

const PLACEMENT: Record<ButtonBlockNode['layout'], Popper.Placement> = {
    [ButtonBlockNode.Layout.LEFT]: 'bottom-start',
    [ButtonBlockNode.Layout.RIGHT]: 'bottom-end',
    [ButtonBlockNode.Layout.CENTER]: 'bottom',
    [ButtonBlockNode.Layout.WIDE]: 'bottom',
};

export function ButtonBlockElement({
    attributes,
    children,
    element,
    info,
    withNewTabOption,
}: Props) {
    const editor = useEditorRef();

    const { layout } = element;

    const align = layout === 'wide' ? 'center' : layout;

    const handleUpdate = useCallback(
        function (patch: Partial<FormState>) {
            updateButtonBlock(editor, element, patch);
        },
        [editor, element],
    );

    const handleRemove = useCallback(
        function () {
            if (removeButtonBlock(editor, element)) {
                EventsEditor.dispatchEvent(editor, 'button-block-removed', {
                    uuid: element.uuid,
                });
            }
        },
        [editor, element],
    );

    return (
        <EditorBlock
            {...attributes}
            element={element}
            align={align}
            menuPlacement={PLACEMENT[layout]}
            overlay="autohide"
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderReadOnlyFrame={() => <Button node={element} />}
            renderMenu={({ updatePosition }) => (
                <ButtonMenu
                    info={info}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                    onReposition={updatePosition}
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
            width={layout !== 'wide' ? 'min-content' : undefined}
            rounded
            void
        />
    );
}
