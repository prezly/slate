import type { GalleryNode} from '@prezly/slate-types';
import { GalleryImageSize, GalleryPadding } from '@prezly/slate-types';
import type { FunctionComponent, RefObject} from 'react';
import React, { useState } from 'react';
import { RootCloseWrapper } from 'react-overlays';
import type { Editor } from 'slate';
import { useSelected, useSlate } from 'slate-react';

import { FloatingMenu, GalleryLayoutSettings } from '../../../../components';
import { Cogwheel, Dice, Edit, Trash } from '../../../../icons';
import { shuffleImages } from '../../lib';
import { removeGallery, updateGallery } from '../../transforms';
import LayoutControls from '../LayoutControls';

import './GalleryMenu.scss';

const PADDING_OPTIONS: { label: string; value: GalleryPadding }[] = [
    { label: 'S', value: GalleryPadding.S },
    { label: 'M', value: GalleryPadding.M },
    { label: 'L', value: GalleryPadding.L },
];

const SIZE_OPTIONS: { label: string; value: GalleryNode['thumbnail_size'] }[] = [
    { label: 'XS', value: GalleryImageSize.XS },
    { label: 'S', value: GalleryImageSize.S },
    { label: 'M', value: GalleryImageSize.M },
    { label: 'L', value: GalleryImageSize.L },
    { label: 'XL', value: GalleryImageSize.XL },
];

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    gallery: GalleryNode;
    onEdit: (editor: Editor) => void;
}

const GalleryMenu: FunctionComponent<Props> = ({ containerRef, element, gallery, onEdit }) => {
    const editor = useSlate();
    const isSelected = useSelected();
    const [showLayoutMenu, setShowLayoutMenu] = useState<boolean>(false);

    const handleEdit = () => onEdit(editor);

    const handleLayoutMenuToggle = () => setShowLayoutMenu(!showLayoutMenu);

    const handleLayoutMenuClose = () => setShowLayoutMenu(false);

    const handleLayoutChange = (layout: GalleryNode['layout']) => updateGallery(editor, { layout });

    const handlePaddingChange = (padding: GalleryNode['padding']) =>
        updateGallery(editor, { padding });

    const handleRemove = () => removeGallery(editor);

    const handleSizeChange = (size: GalleryNode['thumbnail_size']) =>
        updateGallery(editor, { thumbnail_size: size });

    const handleShuffle = () => updateGallery(editor, { images: shuffleImages(gallery.images) });

    if (!isSelected) {
        return null;
    }

    return (
        <FloatingMenu containerRef={containerRef} element={element}>
            <LayoutControls layout={gallery.layout} onChange={handleLayoutChange} />

            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button
                    active={showLayoutMenu}
                    onMouseDown={handleLayoutMenuToggle}
                    title="Layout settings"
                >
                    <FloatingMenu.Icon icon={Cogwheel} />
                </FloatingMenu.Button>

                {gallery.images.length > 1 && (
                    <FloatingMenu.Button onMouseDown={handleShuffle} title="Shuffle images">
                        <FloatingMenu.Icon icon={Dice} />
                    </FloatingMenu.Button>
                )}

                {showLayoutMenu && (
                    <RootCloseWrapper event="mousedown" onRootClose={handleLayoutMenuClose}>
                        <GalleryLayoutSettings<
                            GalleryNode['padding'],
                            GalleryNode['thumbnail_size']
                        >
                            className="gallery-menu__gallery-layout-settings"
                            onClose={handleLayoutMenuClose}
                            onPaddingChange={handlePaddingChange}
                            onSizeChange={handleSizeChange}
                            padding={gallery.padding}
                            paddingOptions={PADDING_OPTIONS}
                            size={gallery.thumbnail_size}
                            sizeOptions={SIZE_OPTIONS}
                        />
                    </RootCloseWrapper>
                )}
            </FloatingMenu.ButtonGroup>

            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button onMouseDown={handleEdit} title="Edit gallery">
                    <FloatingMenu.Icon icon={Edit} />
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>

            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button
                    onMouseDown={handleRemove}
                    title="Delete gallery"
                    variant="danger"
                >
                    <FloatingMenu.Icon icon={Trash} />
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>
        </FloatingMenu>
    );
};

export default GalleryMenu;
