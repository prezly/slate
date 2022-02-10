import { GalleryLayout } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React from 'react';

import { Menu } from '#components';
import { LayoutContained, LayoutExpanded, LayoutFullWidth } from '#icons';

interface Props {
    layout: GalleryLayout;
    onChange: (layout: GalleryLayout) => void;
}

export const LayoutControls: FunctionComponent<Props> = ({ layout, onChange }) => (
    <>
        <Menu.ButtonGroup>
            <Menu.Button
                active={layout === GalleryLayout.CONTAINED}
                onMouseDown={() => onChange(GalleryLayout.CONTAINED)}
                title="Contained gallery"
            >
                <Menu.Icon icon={LayoutContained} />
            </Menu.Button>
            <Menu.Button
                active={layout === GalleryLayout.EXPANDED}
                onMouseDown={() => onChange(GalleryLayout.EXPANDED)}
                title="Expanded gallery"
            >
                <Menu.Icon icon={LayoutExpanded} />
            </Menu.Button>
            <Menu.Button
                active={layout === GalleryLayout.FULL_WIDTH}
                onMouseDown={() => onChange(GalleryLayout.FULL_WIDTH)}
                title="Full width gallery"
            >
                <Menu.Icon icon={LayoutFullWidth} />
            </Menu.Button>
        </Menu.ButtonGroup>
    </>
);
