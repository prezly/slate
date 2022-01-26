import classNames from 'classnames';
import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import { RootCloseWrapper } from 'react-overlays';
import type { Modifier } from 'react-popper';

import { ElementPortalV2 } from '#components';

import { useCurrentDomNode } from './useCurrentDomNode';

interface Props {
    availableWidth: number;
    className?: string;
    containerRef: RefObject<HTMLElement>;
    onClose: () => void;
    open: boolean;
    pointerEvents?: boolean;
    show: boolean;
}

const POSITION_TO_COVER: Modifier<string> = {
    name: 'positionToCover',
    enabled: true,
    phase: 'read',
    requires: ['popperOffsets'],
    fn: ({ state }) => {
        const ref = state.rects.reference;
        state.modifiersData.popperOffsets = {
            x: ref.x,
            y: ref.y,
        };
    },
};

const RESIZE_TO_COVER: Modifier<string> = {
    name: 'resizeToCover',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
        state.styles.popper.height = `${state.rects.reference.height}px`;
    },
    effect: ({ state }) => {
        const rect = state.elements.reference.getBoundingClientRect();
        state.elements.popper.style.width = `${rect.width}px`;
        state.elements.popper.style.height = `${rect.height}px`;
    },
};

const MODIFIERS = [POSITION_TO_COVER, RESIZE_TO_COVER];

export const Container: FunctionComponent<Props> = ({
    availableWidth,
    children,
    className,
    containerRef,
    onClose,
    open,
    pointerEvents,
    show,
}) => {
    const currentDomElement = useCurrentDomNode({ withFallbackToLastExistingNode: open });
    const canShow = open || show;

    if (!currentDomElement || !canShow) {
        return null;
    }

    return (
        <ElementPortalV2
            containerRef={containerRef}
            element={currentDomElement}
            modifiers={MODIFIERS}
            placement="top"
            pointerEvents={pointerEvents}
        >
            <RootCloseWrapper onRootClose={onClose}>
                <div
                    className={classNames('editor-v4-floating-container', className, {
                        'editor-v4-floating-container--uninitialized':
                            typeof availableWidth === 'undefined',
                    })}
                    style={{ width: availableWidth }}
                >
                    {children}
                </div>
            </RootCloseWrapper>
        </ElementPortalV2>
    );
};
