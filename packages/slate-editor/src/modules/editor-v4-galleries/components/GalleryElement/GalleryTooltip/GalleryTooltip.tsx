import type { FunctionComponent, MouseEvent, RefObject } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';

import { Menu } from '#components';
import { Info } from '#icons';

import './GalleryTooltip.scss';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    onClick: (event: MouseEvent<Button>) => void;
}

export const GalleryTooltip: FunctionComponent<Props> = ({ containerRef, element, onClick }) => (
    <Menu.FloatingMenu
        className="gallery-tooltip"
        containerRef={containerRef}
        element={element}
        placement="bottom-end"
    >
        <Info className="gallery-tooltip__icon" />
        You can reorder and crop your gallery images in the{' '}
        <Button bsStyle="unstyled" className="gallery-tooltip__button" onClick={onClick}>
            preview
        </Button>
        .
    </Menu.FloatingMenu>
);
