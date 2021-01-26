import classNames from 'classnames';
import { UploadcareImage } from '@prezly/slate-types';
import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';

import { stringifyReactNode } from '../../lib';

import './Media.scss';

interface Props {
    children?: ReactNode;
    className?: string;
    image: UploadcareImage;
    style?: CSSProperties;
}

const Media: FunctionComponent<Props> = ({ children, className, image, style }) => {
    const title = stringifyReactNode(children);
    const computedClassName = classNames('prezly-slate-media', className, {
        'prezly-slate-media--image': !image.isGif(),
        'prezly-slate-media--video': image.isGif(),
    });

    if (image.isGif()) {
        const video = image.toVideo().bestQuality();
        const sourceWebm = video.format('webm').cdnUrl;
        const sourceMp4 = video.format('mp4').cdnUrl;

        return (
            <video
                autoPlay
                className={computedClassName}
                loop
                muted
                playsInline
                style={style}
                title={title}
                webkit-playsinline
            >
                <source src={sourceWebm} type="video/webm" />
                <source src={sourceMp4} type="video/mp4" />
            </video>
        );
    }

    return (
        <img
            alt={title}
            className={computedClassName}
            src={image.cdnUrl}
            srcSet={image.getSrcSet()}
            style={style}
            title={title}
        />
    );
};

export default Media;
