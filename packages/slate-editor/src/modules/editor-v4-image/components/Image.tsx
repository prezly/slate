import type { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import React, { forwardRef } from 'react';

import { LoadingPlaceholderV2 } from '#components';
import { Image as ImageIcon } from '#icons';
import { useImage } from '#lib';

import styles from './Image.module.scss';

interface Props {
    className?: string;
    image: UploadcareImage;
}

// Image can be of any size, which can increase loading time.
// 2 seconds seems like a reasonable average.
const ESTIMATED_LOADING_DURATION = 2000;

export const Image = forwardRef<HTMLDivElement, Props>(({ className, image }: Props, ref) => {
    const aspectRatio = image.originalWidth / image.originalHeight;
    const { loading, progress, url } = useImage(image.preview().cdnUrl);

    return (
        <div
            className={classNames(className, styles.container)}
            ref={ref}
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
                        <>
                            <LoadingPlaceholderV2.Icon icon={ImageIcon} />
                            <LoadingPlaceholderV2.Description percent={percent}>
                                Loading Image
                            </LoadingPlaceholderV2.Description>
                            <LoadingPlaceholderV2.ProgressBar percent={percent} />
                        </>
                    )}
                </LoadingPlaceholderV2.Placeholder>
            )}
        </div>
    );
});

Image.displayName = 'Image';
