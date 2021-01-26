import { GalleryNode, UploadcareImage } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes, useState } from 'react';
import useMeasure from 'react-use/lib/useMeasure';

import { Lightbox } from '../../components';

import { DEFAULT_MAX_VIEWPORT_WIDTH, IMAGE_PADDING, IMAGE_SIZE } from './constants';
import GalleryImage from './GalleryImage';
import { calculateLayout } from './lib';
import './Gallery.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    node: GalleryNode;
    maxViewportWidth?: number;
}

const Gallery: FunctionComponent<Props> = ({
    children,
    className,
    maxViewportWidth = DEFAULT_MAX_VIEWPORT_WIDTH,
    node,
    ...props
}) => {
    const [lightboxImage, setLightboxImage] = useState<UploadcareImage | null>(null);
    const [ref, { width }] = useMeasure<HTMLDivElement>();
    const margin = IMAGE_PADDING[node.padding];
    const idealHeight = IMAGE_SIZE[node.thumbnail_size] + 2 * margin;
    const imagesStyle = { margin: -margin };
    const imageStyle = { margin };
    const images = node.images.map(({ file }) =>
        UploadcareImage.createFromPrezlyStoragePayload(file),
    );
    const calculatedLayout = calculateLayout({ idealHeight, images, viewportWidth: width });

    const handleImagePreviewClose = () => setLightboxImage(null);

    // TODO: multiline ellipsis (3 lines)

    return (
        <figure
            className={classNames('prezly-slate-gallery', className, {
                'prezly-slate-gallery--contained': node.layout === 'contained',
                'prezly-slate-gallery--expanded': node.layout === 'expanded',
                'prezly-slate-gallery--full-width': node.layout === 'full-width',
            })}
            {...props}
        >
            <div ref={ref} style={imagesStyle}>
                {calculatedLayout.map((row, index) => (
                    <div className="prezly-slate-gallery__images-row" key={index}>
                        {row.map(({ width, height, image }) => (
                            <GalleryImage
                                height={height}
                                image={image}
                                key={image.uuid}
                                onClick={setLightboxImage}
                                style={imageStyle}
                                width={width}
                                withBorderRadius={margin > 0}
                                url={image.resize(maxViewportWidth).cdnUrl}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {lightboxImage && (
                <Lightbox image={lightboxImage} isOpen onClose={handleImagePreviewClose}>
                    {children}
                </Lightbox>
            )}
        </figure>
    );
};

export default Gallery;
