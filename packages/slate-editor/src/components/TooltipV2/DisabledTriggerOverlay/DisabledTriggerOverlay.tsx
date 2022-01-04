import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import './DisabledTriggerOverlay.scss';

export interface Props {
    className?: string;
    onHide: () => void;
    onShow: () => void;
}

/**
 * This component can be used as a workaround if tooltip needs to be shown
 * when hovering a disabled element.
 * (onMouseOver & onMouseOut events do not fire on disabled elements)
 * It requires parent component to have `position: relative`.
 */
export const DisabledTriggerOverlay: FunctionComponent<Props> = ({ className, onHide, onShow }) => (
    <div
        className={classNames('tooltip-v2-disabled-trigger-overlay', className)}
        onMouseEnter={onShow}
        onMouseLeave={onHide}
    />
);
