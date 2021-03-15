import React, { FunctionComponent } from 'react';

import { FloatingMenu, SvgIcon } from 'components';
import { contained, expanded, fullWidth } from 'icons';

import { GalleryLayout } from '../types';

interface Props {
    layout: GalleryLayout;
    onChange: (layout: GalleryLayout) => void;
}

const LayoutControls: FunctionComponent<Props> = ({ layout, onChange }) => (
    <FloatingMenu.ButtonGroup>
        <FloatingMenu.Button
            active={layout === GalleryLayout.FULL_WIDTH}
            onMouseDown={() => onChange(GalleryLayout.FULL_WIDTH)}
            title="Full width gallery"
        >
            <SvgIcon icon={fullWidth} />
        </FloatingMenu.Button>
        <FloatingMenu.Button
            active={layout === GalleryLayout.EXPANDED}
            onMouseDown={() => onChange(GalleryLayout.EXPANDED)}
            title="Expanded gallery"
        >
            <SvgIcon icon={expanded} />
        </FloatingMenu.Button>
        <FloatingMenu.Button
            active={layout === GalleryLayout.CONTAINED}
            onMouseDown={() => onChange(GalleryLayout.CONTAINED)}
            title="Contained gallery"
        >
            <SvgIcon icon={contained} />
        </FloatingMenu.Button>
    </FloatingMenu.ButtonGroup>
);

export default LayoutControls;
