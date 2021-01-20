import { ImageNode, UploadcareImage } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { CSSProperties, FunctionComponent, HTMLAttributes } from 'react';

import './Image.scss';
import Media from './Media';

interface Props extends HTMLAttributes<HTMLElement> {
    file: ImageNode['file'];
    href: ImageNode['href'];
    layout: ImageNode['layout'];
    width: ImageNode['width'];
    widthFactor: ImageNode['width_factor'];
}

const getMediaStyle = ({
    layout,
    width,
    widthFactor,
}: Pick<Props, 'layout' | 'width' | 'widthFactor'>): CSSProperties => {
    if (layout !== 'contained') {
        return {};
    }

    return {
        width: `${((parseFloat(width) * parseFloat(widthFactor)) / 100).toFixed(2)}%`,
    };
};

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
    const mediaStyle = getMediaStyle({ layout, width, widthFactor });

    return (
        <figure
            className={classNames('prezly-slate-image', className, {
                'prezly-slate-image--contained': layout === 'contained',
                'prezly-slate-image--expanded': layout === 'expanded',
                'prezly-slate-image--full-width': layout === 'full-width',
                'prezly-slate-image--gif': uploadcareImage.isGif(),
            })}
            {...props}
        >
            {href && (
                <a
                    href={href}
                    className="prezly-slate-image__link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Media file={file} style={mediaStyle}>
                        {children}
                    </Media>
                </a>
            )}

            {!href && (
                <Media file={file} style={mediaStyle}>
                    {children}
                </Media>
            )}

            <figcaption className="prezly-slate-image__caption">{children}</figcaption>
        </figure>
    );
};

export default Image;
