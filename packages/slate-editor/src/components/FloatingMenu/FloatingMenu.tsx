import { Placement } from '@popperjs/core';
import React, { FunctionComponent, RefObject } from 'react';

import { ElementPortalV2 } from '../Portals';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Dropdown from './Dropdown';
import './FloatingMenu.scss';
import Icon from './Icon';
import Link from './Link';
import SpaLink from './SpaLink';
import Toolbar from './Toolbar';

interface Props {
    className?: string;
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
    placement?: Placement;
}

const FloatingMenu: FunctionComponent<Props> = ({
    children,
    className,
    containerRef,
    element,
    placement = 'top-end',
}) => (
    <ElementPortalV2 containerRef={containerRef} element={element} placement={placement}>
        <Toolbar className={className}>{children}</Toolbar>
    </ElementPortalV2>
);

export default Object.assign(FloatingMenu, {
    Button,
    ButtonGroup,
    Dropdown,
    Icon,
    Link,
    SpaLink,
    Toolbar,
});
