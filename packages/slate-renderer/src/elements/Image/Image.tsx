import { ImageNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import { getUploadcareCdnUrl } from '../../lib';

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
    return (
        <figure className={classNames('prezly-slate-image', className)} {...props}>
            <img
                alt={file.filename}
                className="prezly-slate-image__image"
                height={file.original_height}
                src={getUploadcareCdnUrl(file)}
                width={file.original_width}
            />

            <figcaption className="prezly-slate-image__caption">{children}</figcaption>
        </figure>
    );
};

export default Image;
