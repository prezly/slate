import type { ImageNode, ImageLayout } from '@prezly/slate-types';
import type { FunctionComponent, RefObject } from 'react';
import React, { useState } from 'react';
import type { Editor, Range } from 'slate';
import { Transforms } from 'slate';
import { ReactEditor, useSelected, useSlate } from 'slate-react';

import { Menu } from '../../../components';
import { Delete, Edit, Link } from '../../../icons';
import { LinkMenu } from '../../../modules/editor-v4-components';
import { removeImage, setImageHref, setLayout } from '../transforms';

import LayoutControls from './LayoutControls';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    href: string;
    isLinkMenuOpen: boolean;
    layout: ImageLayout;
    onEdit: () => void;
    onIsLinkMenuOpenChange: (isLinkMenuOpen: boolean) => void;
    onRemove: (editor: Editor, element: ImageNode) => void;
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
            <Menu.FloatingMenu containerRef={containerRef} element={element}>
                <LinkMenu
                    canUnlink={href !== ''}
                    onChange={setLinkValue}
                    onClose={handleCloseLinkMenu}
                    onCreate={handleLinkCreate}
                    onRemove={handleLinkRemove}
                    value={linkValue}
                />
            </Menu.FloatingMenu>
        );
    }

    if (!isSelected) {
        return null;
    }

    return (
        <Menu.FloatingMenu containerRef={containerRef} element={element}>
            {showLayoutControls && <LayoutControls layout={layout} onChange={handleLayoutChange} />}

            <Menu.ButtonGroup>
                <Menu.Button onClick={onEdit} title="Edit image">
                    <Menu.Icon icon={Edit} />
                </Menu.Button>

                <Menu.Button
                    active={isLinked}
                    onClick={handleOpenLinkMenu}
                    title={`${isLinked ? 'Edit' : 'Add'} link`}
                >
                    <Menu.Icon icon={Link} />
                </Menu.Button>
            </Menu.ButtonGroup>

            <Menu.ButtonGroup>
                <Menu.Button onClick={handleRemove} title="Delete image" variant="danger">
                    <Menu.Icon icon={Delete} />
                </Menu.Button>
            </Menu.ButtonGroup>
        </Menu.FloatingMenu>
    );
};

export default ImageMenu;
