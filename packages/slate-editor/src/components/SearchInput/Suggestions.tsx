import type { FlipModifier } from '@popperjs/core/lib/modifiers/flip';
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
    minHeight?: number;
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
    minHeight = 200,
    maxHeight = 400,
    origin,
    query,
    suggestions,
    ...attributes
}: Props<T>) {
    const [height, setHeight] = useState<number>();
    const [calculatedMaxHeight, setMaxHeight] = useState<number>();
    const container = useRef<HTMLDivElement | null>(null);
    const childrenContainer = useRef<HTMLDivElement | null>(null);
    const [scrollarea, setScrollarea] = useState<FancyScrollbars | null>(null);

    const popper = usePopper(origin, container.current, {
        modifiers: [
            {
                name: 'flip',
                enabled: true,
                options: {
                    fallbackPlacements: ['top-end'],
                },
            } satisfies Partial<FlipModifier>,
        ],
        placement: 'bottom-end',
    });

    const updatePanelSize = useFunction(() => {
        setHeight(childrenContainer.current?.getBoundingClientRect().height);

        if (container.current) {
            const viewport = document.body.getBoundingClientRect();
            const rect = container.current.getBoundingClientRect();
            setMaxHeight(clamp(viewport.height - rect.top - 4, minHeight, maxHeight));
        } else {
            setMaxHeight(undefined);
        }
    });

    useEffect(() => {
        window.addEventListener('scroll', updatePanelSize);
        window.addEventListener('resize', updatePanelSize);

        return () => {
            window.removeEventListener('scroll', updatePanelSize);
            window.removeEventListener('resize', updatePanelSize);
        };
    }, [updatePanelSize]);

    useEffect(updatePanelSize, [query, suggestions, minHeight, maxHeight]);

    useEffect(() => {
        async function repositionPopper() {
            await popper.update?.();
            updatePanelSize();

            if (activeElement) {
                scrollarea?.ensureVisible(activeElement);
            }
        }

        repositionPopper();
    }, [activeElement, calculatedMaxHeight]);

    return (
        <Panel
            {...attributes}
            {...popper.attributes.popper}
            style={{ maxHeight: calculatedMaxHeight, ...attributes.style, ...popper.styles.popper }}
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

function clamp(num: number, min: number, max: number) {
    if (num < min) return min;
    if (num > max) return max;
    return num;
}
