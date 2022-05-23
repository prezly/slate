import type { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import React, { forwardRef } from 'react';

import { ResponsiveLoadingPlaceholder } from '#components';
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
    const aspectRatio = 1 / image.aspectRatio;
    const { loading, progress, url } = useImage(image.preview().format().cdnUrl);

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
                <ResponsiveLoadingPlaceholder
                    className={styles.placeholder}
                    icon={ImageIcon}
                    description="Loading Image"
                    estimatedDuration={ESTIMATED_LOADING_DURATION}
                    progress={progress}
                />
            )}
        </div>
    );
});

Image.displayName = 'Image';
