import { ImageLayout } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React from 'react';

import { Menu } from '../../../components';
import { Contained, Expanded, FullWidth } from '../../../icons';

interface Props {
    layout: ImageLayout;
    onChange: (layout: ImageLayout) => void;
}

const LayoutControls: FunctionComponent<Props> = ({ layout, onChange }) => (
    <Menu.ButtonGroup>
        <Menu.Button
            active={layout === ImageLayout.FULL_WIDTH}
            onMouseDown={() => onChange(ImageLayout.FULL_WIDTH)}
            title="Full width image"
        >
            <FullWidth />
        </Menu.Button>
        <Menu.Button
            active={layout === ImageLayout.EXPANDED}
            onMouseDown={() => onChange(ImageLayout.EXPANDED)}
            title="Expanded image"
        >
            <Expanded />
        </Menu.Button>
        <Menu.Button
            active={layout === ImageLayout.CONTAINED}
            onMouseDown={() => onChange(ImageLayout.CONTAINED)}
            title="Contained image"
        >
            <Contained />
        </Menu.Button>
    </Menu.ButtonGroup>
);

export default LayoutControls;
