import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { useState } from 'react';

import { useIsMouseDown } from '../../lib';

import type { Props as BasePortalV2Props } from './BasePortalV2';
import BasePortalV2 from './BasePortalV2';
import { updateCursorPortalRect } from './CursorPortal';
import './CursorPortalV2.scss';

interface Props extends Omit<BasePortalV2Props, 'getBoundingClientRect'> {}

/**
 * Replacement for `CursorPortal` using `react-popper` internally.
 */
const CursorPortalV2: FunctionComponent<Props> = ({ className, ...props }) => {
    // When making a selection with mouse, it's possible that mouse will be moved so quickly that
    // it will hover over the `children` of the `BasePortalV2` and it will interfere with the
    // selection that is being made. To make sure, we disable `pointer-events` when selection
    // is being made.
    const isMouseDown = useIsMouseDown();
    const [isMouseDownInPortal, setIsMouseDownInPortal] = useState<boolean>(false);

    return (
        <BasePortalV2
            {...props}
            className={classNames('cursor-portal-v2', className, {
                'cursor-portal-v2--selecting': isMouseDown && !isMouseDownInPortal,
            })}
            getBoundingClientRect={updateCursorPortalRect}
            onMouseDown={() => setIsMouseDownInPortal(true)}
            onMouseUp={() => setIsMouseDownInPortal(false)}
        />
    );
};

export default CursorPortalV2;
