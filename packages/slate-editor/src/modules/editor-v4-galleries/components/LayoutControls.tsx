import { GalleryLayout } from '@prezly/slate-types';
import React, { FunctionComponent } from 'react';

import { FloatingMenu } from '../../../components';
import { Contained, Expanded, FullWidth } from '../../../icons';

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
            <FullWidth />
        </FloatingMenu.Button>
        <FloatingMenu.Button
            active={layout === GalleryLayout.EXPANDED}
            onMouseDown={() => onChange(GalleryLayout.EXPANDED)}
            title="Expanded gallery"
        >
            <Expanded />
        </FloatingMenu.Button>
        <FloatingMenu.Button
            active={layout === GalleryLayout.CONTAINED}
            onMouseDown={() => onChange(GalleryLayout.CONTAINED)}
            title="Contained gallery"
        >
            <Contained />
        </FloatingMenu.Button>
    </FloatingMenu.ButtonGroup>
);

export default LayoutControls;
