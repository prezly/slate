import React, { FunctionComponent, RefObject, useState } from 'react';
import { Editor, Range, Transforms } from 'slate';
import { ReactEditor, useSelected, useSlate } from 'slate-react';

import { FloatingMenu } from '../../../components';
import { Edit, Link, Trash } from '../../../icons';
import { LinkMenu } from '../../../modules/editor-v4-components';
import { removeImage, setImageHref, setLayout } from '../transforms';
import { ImageElementType, ImageLayout } from '../types';

import LayoutControls from './LayoutControls';
import MenuButton from './MenuButton';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    href: string;
    isLinkMenuOpen: boolean;
    layout: ImageLayout;
    onEdit: () => void;
    onIsLinkMenuOpenChange: (isLinkMenuOpen: boolean) => void;
    onRemove: (editor: Editor, element: ImageElementType) => void;
    showLayoutControls?: boolean;
}

const ImageMenu: FunctionComponent<Props> = ({
    containerRef,
    element,
    href,
    isLinkMenuOpen,
    layout,
    onEdit,
    onIsLinkMenuOpenChange,
    onRemove,
    showLayoutControls = false,
}) => {
    const editor = useSlate();
    const isSelected = useSelected();
    const [linkValue, setLinkValue] = useState(href);
    const [savedSelection, setSavedSelection] = useState<Range | null>(null);
    const isLinked = href !== '';

    const handleOpenLinkMenu = () => {
        setLinkValue(href);
        setSavedSelection(editor.selection);
        onIsLinkMenuOpenChange(true);

        // We have to blur the editor to allow the LinkMenu input focus.
        ReactEditor.blur(editor);
    };

    const handleCloseLinkMenu = () => {
        onIsLinkMenuOpenChange(false);

        if (savedSelection) {
            ReactEditor.focus(editor);
            Transforms.select(editor, savedSelection);
        }
    };

    const handleLayoutChange = (newLayout: ImageLayout) => {
        setLayout(editor, newLayout);
    };

    const handleLinkCreate = () => {
        if (savedSelection) {
            setImageHref(editor, savedSelection, linkValue);
        }

        handleCloseLinkMenu();
    };

    const handleLinkRemove = () => {
        if (savedSelection) {
            setImageHref(editor, savedSelection, '');
            setLinkValue('');
        }

        handleCloseLinkMenu();
    };

    const handleRemove = () => {
        const removedElement = removeImage(editor);

        if (removedElement) {
            onRemove(editor, removedElement);
        }
    };

    if (isLinkMenuOpen) {
        return (
            <FloatingMenu containerRef={containerRef} element={element}>
                <LinkMenu
                    canUnlink={href !== ''}
                    onChange={setLinkValue}
                    onClose={handleCloseLinkMenu}
                    onCreate={handleLinkCreate}
                    onRemove={handleLinkRemove}
                    value={linkValue}
                />
            </FloatingMenu>
        );
    }

    if (!isSelected) {
        return null;
    }

    return (
        <FloatingMenu containerRef={containerRef} element={element}>
            {showLayoutControls && <LayoutControls layout={layout} onChange={handleLayoutChange} />}

            <FloatingMenu.ButtonGroup>
                <MenuButton onClick={onEdit} title="Edit image">
                    <FloatingMenu.Icon icon={Edit} />
                </MenuButton>

                <MenuButton
                    isActive={isLinked}
                    onClick={handleOpenLinkMenu}
                    title={`${isLinked ? 'Edit' : 'Add'} link`}
                >
                    <FloatingMenu.Icon icon={Link} />
                </MenuButton>
            </FloatingMenu.ButtonGroup>

            <FloatingMenu.ButtonGroup>
                <MenuButton onClick={handleRemove} title="Delete image" variant="danger">
                    <FloatingMenu.Icon icon={Trash} />
                </MenuButton>
            </FloatingMenu.ButtonGroup>
        </FloatingMenu>
    );
};

export default ImageMenu;
