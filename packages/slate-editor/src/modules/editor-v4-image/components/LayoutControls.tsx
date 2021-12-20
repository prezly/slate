import { ImageLayout } from '@prezly/slate-types';
import type { FunctionComponent } from 'react';
import React from 'react';

import { Menu } from '../../../components';
import { LayoutContained, LayoutExpanded, LayoutFullWidth } from '../../../icons';

interface Props {
    layout: ImageLayout;
    onChange: (layout: ImageLayout) => void;
}

const LayoutControls: FunctionComponent<Props> = ({ layout, onChange }) => (
    <Menu.ButtonGroup>
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
);

export default LayoutControls;
