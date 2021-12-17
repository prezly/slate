import { GalleryLayout } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React from 'react';

import { Menu } from '../../../components';
import { Contained, Expanded, FullWidth } from '../../../icons';

interface Props {
    layout: GalleryLayout;
    onChange: (layout: GalleryLayout) => void;
}

const LayoutControls: FunctionComponent<Props> = ({ layout, onChange }) => (
    <Menu.ButtonGroup>
        <Menu.Button
            active={layout === GalleryLayout.FULL_WIDTH}
            onMouseDown={() => onChange(GalleryLayout.FULL_WIDTH)}
            title="Full width gallery"
        >
            <FullWidth />
        </Menu.Button>
        <Menu.Button
            active={layout === GalleryLayout.EXPANDED}
            onMouseDown={() => onChange(GalleryLayout.EXPANDED)}
            title="Expanded gallery"
        >
            <Expanded />
        </Menu.Button>
        <Menu.Button
            active={layout === GalleryLayout.CONTAINED}
            onMouseDown={() => onChange(GalleryLayout.CONTAINED)}
            title="Contained gallery"
        >
            <Contained />
        </Menu.Button>
    </Menu.ButtonGroup>
);

export default LayoutControls;
