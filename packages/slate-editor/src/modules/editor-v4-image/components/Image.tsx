import type { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import React, { forwardRef, useState } from 'react';

import { LoadingPlaceholderV2 } from '#components';
import { Image as ImageIcon } from '#icons';
import { useImage, useResizeObserver } from '#lib';

import styles from './Image.module.scss';

interface Props {
    className?: string;
    image: UploadcareImage;
}

// Image can be of any size, which can increase loading time.
// 2 seconds seems like a reasonable average.
const ESTIMATED_LOADING_DURATION = 2000;

export const Image = forwardRef<HTMLDivElement, Props>(({ className, image }: Props, ref) => {
    const aspectRatio = 1 / image.aspectRatio;
    const { loading, progress, url } = useImage(image.preview().format().cdnUrl);
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useResizeObserver(element, function (entries) {
        entries.forEach((value) => {
            setWidth(value.target.clientWidth);
            setHeight(value.target.clientWidth);
        });
    });

    return (
        <div
            className={classNames(className, styles.container)}
            ref={(element: HTMLDivElement) => {
                setElement(element);
                if (typeof ref === 'function') {
                    ref(element);
                } else if (ref) {
                    ref.current = element;
                }
            }}
            style={{
                paddingBottom: `${(aspectRatio * 100).toFixed(2)}%`,
                backgroundImage: url ? `url("${url}")` : undefined,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
            }}
        >
            {loading && (
                <LoadingPlaceholderV2.Placeholder
                    className={styles.placeholder}
                    estimatedDuration={ESTIMATED_LOADING_DURATION}
                    progress={progress * 0.01}
                >
                    {({ percent }) => (
                        <Placeholder
                            percent={percent}
                            withIcon={height === 0 || height >= 300}
                            withText={width === 0 || (height >= 200 && width >= 200)}
                        />
                    )}
                </LoadingPlaceholderV2.Placeholder>
            )}
        </div>
    );
});

Image.displayName = 'Image';

function Placeholder(props: { percent: string; withIcon: boolean; withText: boolean }) {
    return (
        <>
            {props.withIcon && <LoadingPlaceholderV2.Icon icon={ImageIcon} />}
            {props.withText && (
                <LoadingPlaceholderV2.Description percent={props.percent}>
                    Loading Image
                </LoadingPlaceholderV2.Description>
            )}
            <LoadingPlaceholderV2.ProgressBar percent={props.percent} />
        </>
    );
}
