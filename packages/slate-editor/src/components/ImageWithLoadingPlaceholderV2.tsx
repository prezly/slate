import { noop } from 'lodash';
import React, {
    CSSProperties,
    forwardRef,
    ImgHTMLAttributes,
    ReactNode,
    Ref,
    useEffect,
} from 'react';

import { useImage } from '../lib';

import LoadingPlaceholderV2 from './LoadingPlaceholderV2';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    availableWidth: number;
    height?: number;
    onIsLoadingChange?: (isLoading: boolean) => void;
    renderLoadingState: (props: { percent: string }) => ReactNode;
    src: string;
    width?: number;
}

// Image can be of any size, which can increase loading time.
// 2 seconds seems like a reasonable average.
const ESTIMATED_LOADING_DURATION = 2000;

const getPlaceholderStyle = ({
    availableWidth,
    height,
    style,
    width,
}: Pick<Props, 'availableWidth' | 'height' | 'style' | 'width'>): CSSProperties | undefined => {
    if (
        typeof availableWidth !== 'number' ||
        typeof height !== 'number' ||
        typeof width !== 'number'
    ) {
        return style;
    }

    const aspectRatio = height / width;
    const finalWidth = Math.min(width, availableWidth);
    const finalHeight = finalWidth * aspectRatio;

    return {
        ...style,
        height: finalHeight,
        width: finalWidth,
    };
};

const ImageWithLoadingPlaceholderV2 = forwardRef<HTMLElement, Props>(
    (
        {
            availableWidth,
            className,
            height,
            onIsLoadingChange = noop,
            renderLoadingState,
            src,
            style,
            width,
            ...props
        },
        ref,
    ) => {
        const { loading, progress, url } = useImage(src);

        useEffect(() => {
            onIsLoadingChange(loading);
        }, [loading, onIsLoadingChange]);

        if (loading) {
            return (
                <LoadingPlaceholderV2
                    className={className}
                    estimatedDuration={ESTIMATED_LOADING_DURATION}
                    progress={progress / 100}
                    ref={ref as Ref<HTMLDivElement>}
                    style={getPlaceholderStyle({ availableWidth, height, style, width })}
                >
                    {renderLoadingState}
                </LoadingPlaceholderV2>
            );
        }

        return (
            <img
                {...props}
                className={className}
                height={height}
                ref={ref as Ref<HTMLImageElement>}
                src={url}
                style={style}
                width={width}
            />
        );
    },
);

export default ImageWithLoadingPlaceholderV2;
