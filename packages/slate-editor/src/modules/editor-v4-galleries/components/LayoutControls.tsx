import { GalleryLayout } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React from 'react';

import { Menu } from '#components';
import {
    LayoutClassicContained,
    LayoutClassicExpanded,
    LayoutClassicFullWidth,
    LayoutContained,
    LayoutExpanded,
    LayoutFullWidth,
} from '#icons';
import { Theme } from '#modules/themes';

interface Props {
    layout: GalleryLayout;
    onChange: (layout: GalleryLayout) => void;
}

const LayoutControls: FunctionComponent<Props> = ({ layout, onChange }) => (
    <>
        <Menu.ButtonGroup visibility={Theme.DARK}>
            <Menu.Button
                active={layout === GalleryLayout.CONTAINED}
                onClick={() => onChange(GalleryLayout.CONTAINED)}
                title="Contained gallery"
            >
                <Menu.Icon icon={LayoutContained} />
            </Menu.Button>
            <Menu.Button
                active={layout === GalleryLayout.EXPANDED}
                onClick={() => onChange(GalleryLayout.EXPANDED)}
                title="Expanded gallery"
            >
                <Menu.Icon icon={LayoutExpanded} />
            </Menu.Button>
            <Menu.Button
                active={layout === GalleryLayout.FULL_WIDTH}
                onClick={() => onChange(GalleryLayout.FULL_WIDTH)}
                title="Full width gallery"
            >
                <Menu.Icon icon={LayoutFullWidth} />
            </Menu.Button>
        </Menu.ButtonGroup>

        <Menu.ButtonGroup visibility={Theme.CLASSIC}>
            <Menu.Button
                active={layout === GalleryLayout.CONTAINED}
                onClick={() => onChange(GalleryLayout.CONTAINED)}
                title="Contained gallery"
            >
                <Menu.Icon icon={LayoutClassicContained} />
            </Menu.Button>
            <Menu.Button
                active={layout === GalleryLayout.EXPANDED}
                onClick={() => onChange(GalleryLayout.EXPANDED)}
                title="Expanded gallery"
            >
                <Menu.Icon icon={LayoutClassicExpanded} />
            </Menu.Button>
            <Menu.Button
                active={layout === GalleryLayout.FULL_WIDTH}
                onClick={() => onChange(GalleryLayout.FULL_WIDTH)}
                title="Full width gallery"
            >
                <Menu.Icon icon={LayoutClassicFullWidth} />
            </Menu.Button>
        </Menu.ButtonGroup>
    </>
);

export default LayoutControls;
