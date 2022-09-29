import classNames from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { useFunction } from '#lib';

import { FancyScrollbars } from '../FancyScrollbars';

import { Panel } from './Panel';
import styles from './Suggestions.module.scss';
import type { Suggestion } from './types';

export interface Props<T> extends HTMLAttributes<HTMLDivElement> {
    minHeight?: number;
    maxHeight?: number;
    query: string;
    suggestions: Suggestion<T>[];
    footer?: ReactNode;
}

export function Suggestions<T>({
    children,
    className,
    footer,
    minHeight = 200,
    maxHeight = 1000,
    query,
    suggestions,
    ...attributes
}: Props<T>) {
    const [height, setHeight] = useState<number>();
    const [calculatedMaxHeight, setMaxHeight] = useState<number>();
    const container = useRef<HTMLDivElement | null>(null);
    const childrenContainer = useRef<HTMLDivElement | null>(null);

    const handlePositioning = useFunction(() => {
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
        handlePositioning();

        window.addEventListener('scroll', handlePositioning);
        window.addEventListener('resize', handlePositioning);

        return () => {
            window.removeEventListener('scroll', handlePositioning);
            window.removeEventListener('resize', handlePositioning);
        };
    }, [handlePositioning]);

    useEffect(handlePositioning, [query, suggestions, minHeight, maxHeight]);

    return (
        <Panel
            {...attributes}
            style={{ maxHeight: calculatedMaxHeight, ...attributes.style }}
            ref={container}
            className={classNames(className, styles.Suggestions)}
            footer={footer}
        >
            <FancyScrollbars style={{ flexGrow: 1, height }}>
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
