import type { FlipModifier } from '@popperjs/core/lib/modifiers/flip';
import type { PreventOverflowModifier } from '@popperjs/core/lib/modifiers/preventOverflow';
import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { useFunction } from '#lib';

import { FancyScrollbars } from '../FancyScrollbars';

import { Panel } from './Panel';
import styles from './Suggestions.module.scss';
import type { Suggestion } from './types';

export interface Props<T> extends HTMLAttributes<HTMLDivElement> {
    activeElement: HTMLElement | undefined;
    footer?: ReactNode;
    maxHeight?: number;
    origin: HTMLElement | null;
    query: string;
    suggestions: Suggestion<T>[];
}

export function Suggestions<T>({
    activeElement,
    children,
    className,
    footer,
    maxHeight = 500,
    origin,
    query,
    suggestions,
    ...attributes
}: Props<T>) {
    const [height, setHeight] = useState<number>();
    const container = useRef<HTMLDivElement | null>(null);
    const childrenContainer = useRef<HTMLDivElement | null>(null);
    const [scrollarea, setScrollarea] = useState<FancyScrollbars | null>(null);

    const popper = usePopper(origin, container.current, {
        modifiers: [
            {
                name: 'flip',
                enabled: true,
                options: {
                    fallbackPlacements: ['top'],
                },
            } satisfies Partial<FlipModifier>,
            {
                name: 'preventOverflow',
                enabled: true,
                options: {
                    altAxis: true,
                    mainAxis: true,
                },
            } satisfies Partial<PreventOverflowModifier>,
        ],
        placement: 'bottom',
    });

    const updatePanelSizeAndPosition = useFunction(() => {
        setHeight(childrenContainer.current?.getBoundingClientRect().height);
        popper.update?.();
    });

    useEffect(() => {
        updatePanelSizeAndPosition();
    }, [updatePanelSizeAndPosition]);

    useEffect(updatePanelSizeAndPosition, [query, suggestions, maxHeight]);

    useEffect(() => {
        if (activeElement) {
            scrollarea?.ensureVisible(activeElement);
        }
    }, [scrollarea, activeElement]);

    return (
        <Panel
            {...attributes}
            {...popper.attributes.popper}
            style={{ maxHeight, ...attributes.style, ...popper.styles.popper }}
            ref={container}
            className={classNames(className, styles.Suggestions)}
            footer={footer}
            placement={popper.state?.placement}
        >
            <FancyScrollbars ref={setScrollarea} style={{ flexGrow: 1, height }}>
                <div ref={childrenContainer}>{children}</div>
            </FancyScrollbars>
        </Panel>
    );
}
