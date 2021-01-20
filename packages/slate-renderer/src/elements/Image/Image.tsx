import { ImageNode, UploadcareImage } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Image.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    file: ImageNode['file'];
    href: ImageNode['href'];
    layout: ImageNode['layout'];
    width: ImageNode['width'];
    widthFactor: ImageNode['width_factor'];
}

// const availableWidth = 1000; //TODO

const Image: FunctionComponent<Props> = ({
    children,
    className,
    file,
    href,
    layout,
    width,
    widthFactor,
    ...props
}) => {
    const uploadcareImage = UploadcareImage.createFromPrezlyStoragePayload(file);
    // image.preview(
    //     availableWidth * 2, // Using 2x for retina.
    // );

    const computedWidth = file.original_width;
    const computedHeight = file.original_height;

    const image = (
        <img
            alt={typeof children === 'string' ? children : file.filename}
            className="prezly-slate-image__image"
            height={computedHeight}
            src={uploadcareImage.cdnUrl}
            // srcSet={getUploadcareSrcSet(file)}
            width={computedWidth}
        />
    );

    return (
        <figure className={classNames('prezly-slate-image', className)} {...props}>
            {href && (
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {image}
                </a>
            )}

            {!href && image}

            <figcaption className="prezly-slate-image__caption">{children}</figcaption>
        </figure>
    );
};

export default Image;
