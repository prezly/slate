import React, { FunctionComponent } from 'react';

import { FloatingMenu } from '../../../components';
import { Contained, Expanded, FullWidth } from '../../../icons';
import { ImageLayout } from '../types';

interface Props {
    layout: ImageLayout;
    onChange: (layout: ImageLayout) => void;
}

const LayoutControls: FunctionComponent<Props> = ({ layout, onChange }) => (
    <FloatingMenu.ButtonGroup>
        <FloatingMenu.Button
            active={layout === ImageLayout.FULL_WIDTH}
            onMouseDown={() => onChange(ImageLayout.FULL_WIDTH)}
            title="Full width image"
        >
            <FullWidth />
        </FloatingMenu.Button>
        <FloatingMenu.Button
            active={layout === ImageLayout.EXPANDED}
            onMouseDown={() => onChange(ImageLayout.EXPANDED)}
            title="Expanded image"
        >
            <Expanded />
        </FloatingMenu.Button>
        <FloatingMenu.Button
            active={layout === ImageLayout.CONTAINED}
            onMouseDown={() => onChange(ImageLayout.CONTAINED)}
            title="Contained image"
        >
            <Contained />
        </FloatingMenu.Button>
    </FloatingMenu.ButtonGroup>
);

export default LayoutControls;
