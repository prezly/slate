import classNames from 'classnames';
import { ImageNode, UploadcareImage } from '@prezly/slate-types';
import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';

import { stringifyReactNode } from '../../lib';

import './Media.scss';

interface Props {
    children?: ReactNode;
    className?: string;
    file: ImageNode['file'];
    style?: CSSProperties;
}

const Media: FunctionComponent<Props> = ({ children, className, file, style }) => {
    const uploadcareImage = UploadcareImage.createFromPrezlyStoragePayload(file);
    const title = stringifyReactNode(children) || file.filename;
    const computedClassName = classNames('prezly-slate-media', className, {
        'prezly-slate-media--image': !uploadcareImage.isGif(),
        'prezly-slate-media--video': uploadcareImage.isGif(),
    });

    if (uploadcareImage.isGif()) {
        const video = uploadcareImage.toVideo().bestQuality();
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
            src={uploadcareImage.cdnUrl}
            srcSet={uploadcareImage.getSrcSet()}
            style={style}
            title={title}
        />
    );
};

export default Media;
