import React, { forwardRef, useState } from 'react';

import { mergeRefs, useResizeObserver } from '#lib';

import type { Props as BaseProps } from './LoadingPlaceholder';
import { LoadingPlaceholder } from './LoadingPlaceholder';

interface Props extends BaseProps {
    iconMinWidth?: number;
    iconMinHeight?: number;
    descriptionMinWidth?: number;
    descriptionMinHeight?: number;
}

export const ResponsiveLoadingPlaceholder = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const uninitialized = width === 0 || height === 0;

    useResizeObserver(element, function (entries) {
        entries.forEach((value) => {
            setWidth(value.target.clientWidth);
            setHeight(value.target.clientHeight);
        });
    });

    const {
        icon,
        iconMinWidth = 100,
        iconMinHeight = 200,
        description,
        descriptionMinWidth = 200,
        descriptionMinHeight = 100,
        ...rest
    } = props;

    const withIcon =
        (iconMinWidth === undefined || iconMinWidth <= width) &&
        (iconMinHeight === undefined || iconMinHeight <= height);
    const withDescription =
        (descriptionMinWidth === undefined || descriptionMinWidth <= width) &&
        (descriptionMinHeight === undefined || descriptionMinHeight <= height);

    return (
        <LoadingPlaceholder
            {...rest}
            icon={uninitialized || withIcon ? icon : false}
            description={uninitialized || withDescription ? description : false}
            ref={mergeRefs(ref, setElement)}
        />
    );
});

ResponsiveLoadingPlaceholder.displayName = 'ResponsiveLoadingPlaceholder';
