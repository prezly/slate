import classNames from 'classnames';
import type { Rect } from 'rangefix';
import type { FunctionComponent } from 'react';
import React, { useCallback, useEffect, useRef } from 'react';
import { Portal } from 'react-portal';
import { useRafLoop } from 'react-use';

import './BasePortal.scss';
import getUpdatedPosition from './getUpdatedPosition';
import type { PortalProps } from './types';

interface Props extends PortalProps {
    getElementRect: () => ClientRect | Rect | null;
}

const BasePortal: FunctionComponent<Props> = ({
    children,
    className,
    containerRef,
    getElementRect,
    origin,
    pointerEvents = true,
    preventPositionUpdates,
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback(() => {
        const wrapper = wrapperRef.current;
        const container = containerRef.current;
        const rect = getElementRect();
        if (wrapper && container && rect) {
            // without the two following lines BasePortal will not resize properly when children change
            wrapper.style.left = '0';
            wrapper.style.top = '0';
            const { top, left } = getUpdatedPosition({ origin, wrapper, container, rect });
            wrapper.style.top = `${Math.floor(top)}px`;
            wrapper.style.left = `${Math.floor(left)}px`;
            wrapper.style.opacity = '1';
        }
    }, [containerRef, getElementRect, origin, wrapperRef]);

    const [rafLoopStop /* isActive */, , rafLoopStart] = useRafLoop(() => {
        updatePosition();
    });

    useEffect(() => {
        if (preventPositionUpdates) {
            rafLoopStop();
        } else {
            rafLoopStart();
        }
    }, [preventPositionUpdates, rafLoopStart, rafLoopStop]);

    useEffect(() => {
        updatePosition();
    }, [origin, updatePosition]);

    return (
        <Portal node={containerRef.current}>
            <div
                className={classNames('base-portal', className, {
                    'base-portal--no-pointer-events': !pointerEvents,
                })}
                ref={wrapperRef}
            >
                {children}
            </div>
        </Portal>
    );
};

export default BasePortal;
