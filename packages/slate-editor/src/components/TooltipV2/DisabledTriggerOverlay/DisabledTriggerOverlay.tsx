import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import './DisabledTriggerOverlay.scss';

interface Props {
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
const DisabledTriggerOverlay: FunctionComponent<Props> = ({ className, onHide, onShow }) => (
    <div
        className={classNames('tooltip-v2-disabled-trigger-overlay', className)}
        onMouseEnter={onShow}
        onMouseLeave={onHide}
    />
);

export default DisabledTriggerOverlay;
