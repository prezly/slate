import classNames from 'classnames';
import type { FunctionComponent, RefObject } from 'react';
import * as React from 'react';
import { RootCloseWrapper } from 'react-overlays';

import { ElementPortal, PortalOrigin } from '../../../components';

import { Button } from './components';
import './FloatingContainer.scss';
import useCurrentDomNode from './useCurrentDomNode';

interface Props {
    availableWidth: number;
    className?: string;
    containerRef: RefObject<HTMLElement>;
    onClose: () => void;
    open: boolean;
    pointerEvents?: boolean;
    show: boolean;
}

const FloatingContainer: FunctionComponent<Props> = ({
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
        <ElementPortal
            containerRef={containerRef}
            element={currentDomElement}
            origin={PortalOrigin.COVER}
            pointerEvents={pointerEvents}
            preventPositionUpdates={open}
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
        </ElementPortal>
    );
};

export default Object.assign(FloatingContainer, {
    Button,
});
