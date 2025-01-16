import classNames from 'classnames';
import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import React, { forwardRef, useEffect } from 'react';

import { useImage, useLatest } from '#lib';

import styles from './ImageWithLoadingPlaceholder.module.scss';
import type { Props as LoadingPlaceholderProps } from './LoadingPlaceholder';
import { LoadingPlaceholder } from './LoadingPlaceholder';

interface Props
    extends Omit<HTMLAttributes<HTMLDivElement>, 'placeholder'>,
        Pick<LoadingPlaceholderProps, 'icon' | 'description' | 'estimatedDuration'>,
        Pick<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
    src: string;
    imageWidth: number | undefined;
    imageHeight: number | undefined;
    onStartLoading?: () => void;
    onLoad?: () => void;
}

/**
 * When image is rendered again the browser will load it from cache.
 * We don't have to show the loading state as loading from cache is very fast.
 * But still, it takes some time.
 */
const LOADING_CALLBACK_DEBOUNCE = 50;

// Image can be of any size, which can increase loading time.
// 2 seconds seems like a reasonable average.
const ESTIMATED_LOADING_DURATION = 2000;

const FALLBACK_ASPECT_RATIO = 16 / 10;

export const ImageWithLoadingPlaceholder = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const {
        // Placeholder
        icon = false,
        description = false,
        estimatedDuration = ESTIMATED_LOADING_DURATION,
        // Image
        src,
        alt,
        imageWidth: predictedWidth,
        imageHeight: predictedHeight,
        onStartLoading,
        onLoad,
        ...attributes
    } = props;

    const { isLoading, isLoaded, width: actualWidth, height: actualHeight } = useImage(src);

    const imageWidth = actualWidth ?? predictedWidth ?? 0;
    const imageHeight = actualHeight ?? predictedHeight ?? 0;

    const aspectRatio =
        imageWidth > 0 && imageHeight > 0 ? imageWidth / imageHeight : FALLBACK_ASPECT_RATIO;

    const callbacks = useLatest({ onStartLoading, onLoad });

    useEffect(
        function () {
            if (isLoading) {
                const timeout = setTimeout(
                    () => callbacks.current.onStartLoading?.(),
                    LOADING_CALLBACK_DEBOUNCE,
                );
                return () => clearTimeout(timeout);
            }
            if (isLoaded) {
                callbacks.current.onLoad?.();
            }
            return;
        },
        [isLoading, isLoaded],
    );

    return (
        <div
            {...attributes}
            className={classNames(styles.ImageWithLoadingPlaceholder, attributes.className)}
            style={{
                aspectRatio: aspectRatio ? String(aspectRatio) : undefined,
                backgroundImage: isLoaded ? `url("${src}")` : undefined,
                paddingBottom: aspectRatio ? `${(100 / aspectRatio).toFixed(2)}%` : undefined,
                ...attributes.style,
            }}
            ref={ref}
        >
            {isLoaded && <img className={styles.Image} src={src} alt={alt} />}

            {isLoading && (
                <LoadingPlaceholder
                    className={styles.Placeholder}
                    icon={icon}
                    description={description}
                    progress="auto"
                    estimatedDuration={estimatedDuration}
                    ref={ref}
                    style={{ width: '100%', height: '100%' }}
                />
            )}
        </div>
    );
});

ImageWithLoadingPlaceholder.displayName = 'ImageWithLoadingPlaceholder';
