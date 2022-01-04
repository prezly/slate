import { ImageLayout } from '@prezly/slate-types';
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
    layout: ImageLayout;
    onChange: (layout: ImageLayout) => void;
}

export const LayoutControls: FunctionComponent<Props> = ({ layout, onChange }) => (
    <>
        <Menu.ButtonGroup visibility={Theme.DARK}>
            <Menu.Button
                active={layout === ImageLayout.CONTAINED}
                onMouseDown={() => onChange(ImageLayout.CONTAINED)}
                title="Contained image"
            >
                <Menu.Icon icon={LayoutContained} />
            </Menu.Button>
            <Menu.Button
                active={layout === ImageLayout.EXPANDED}
                onMouseDown={() => onChange(ImageLayout.EXPANDED)}
                title="Expanded image"
            >
                <Menu.Icon icon={LayoutExpanded} />
            </Menu.Button>
            <Menu.Button
                active={layout === ImageLayout.FULL_WIDTH}
                onMouseDown={() => onChange(ImageLayout.FULL_WIDTH)}
                title="Full width image"
            >
                <Menu.Icon icon={LayoutFullWidth} />
            </Menu.Button>
        </Menu.ButtonGroup>

        <Menu.ButtonGroup visibility={Theme.CLASSIC}>
            <Menu.Button
                active={layout === ImageLayout.CONTAINED}
                onMouseDown={() => onChange(ImageLayout.CONTAINED)}
                title="Contained image"
            >
                <Menu.Icon icon={LayoutClassicContained} />
            </Menu.Button>
            <Menu.Button
                active={layout === ImageLayout.EXPANDED}
                onMouseDown={() => onChange(ImageLayout.EXPANDED)}
                title="Expanded image"
            >
                <Menu.Icon icon={LayoutClassicExpanded} />
            </Menu.Button>
            <Menu.Button
                active={layout === ImageLayout.FULL_WIDTH}
                onMouseDown={() => onChange(ImageLayout.FULL_WIDTH)}
                title="Full width image"
            >
                <Menu.Icon icon={LayoutClassicFullWidth} />
            </Menu.Button>
        </Menu.ButtonGroup>
    </>
);
