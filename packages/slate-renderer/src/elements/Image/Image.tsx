import { ImageNode, UploadcareImage } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { CSSProperties, FunctionComponent, HTMLAttributes, useState } from 'react';

import { Lightbox, Media, Rollover } from '../../components';

import './Image.scss';

interface Props extends HTMLAttributes<HTMLElement> {
    node: ImageNode;
}

const getContainerStyle = (node: ImageNode): CSSProperties => {
    if (node.layout !== 'contained') {
        return {};
    }

    const width = `${((parseFloat(node.width) * parseFloat(node.width_factor)) / 100).toFixed(2)}%`;

    if (width === `${(100).toFixed(2)}%`) {
        return {};
    }

    return { width };
};

const Image: FunctionComponent<Props> = ({ children, className, node, ...props }) => {
    const { file, href, layout } = node;
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const image = UploadcareImage.createFromPrezlyStoragePayload(file);
    const containerStyle = getContainerStyle(node);
    const handleRolloverClick = () => setIsPreviewOpen(true);
    const handleImagePreviewClose = () => setIsPreviewOpen(false);

    return (
        <figure
            className={classNames('prezly-slate-image', className, {
                'prezly-slate-image--contained': layout === 'contained',
                'prezly-slate-image--expanded': layout === 'expanded',
                'prezly-slate-image--full-width': layout === 'full-width',
                'prezly-slate-image--gif': image.isGif(),
            })}
            {...props}
        >
            {href && (
                <a
                    href={href}
                    className="prezly-slate-image__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={containerStyle}
                >
                    <Media className="prezly-slate-image__media" image={image}>
                        {children}
                    </Media>
                </a>
            )}

            {!href && (
                <Rollover
                    disabled={image.isGif()}
                    onClick={handleRolloverClick}
                    style={containerStyle}
                >
                    <Media className="prezly-slate-image__media" image={image}>
                        {children}
                    </Media>
                </Rollover>
            )}

            <figcaption className="prezly-slate-image__caption">{children}</figcaption>

            <Lightbox image={isPreviewOpen ? image : null} onClose={handleImagePreviewClose}>
                {children}
            </Lightbox>
        </figure>
    );
};

export default Image;
