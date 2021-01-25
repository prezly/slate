import classNames from 'classnames';
import { ImageNode, UploadcareImage } from '@prezly/slate-types';
import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';

import './Image.scss';

interface Props {
    children?: ReactNode;
    className?: string;
    file: ImageNode['file'];
    style?: CSSProperties;
}

const Media: FunctionComponent<Props> = ({ children, className, file, style }) => {
    const uploadcareImage = UploadcareImage.createFromPrezlyStoragePayload(file);

    if (uploadcareImage.isGif()) {
        const video = uploadcareImage.toVideo().bestQuality();
        const sourceWebm = video.format('webm').cdnUrl;
        const sourceMp4 = video.format('mp4').cdnUrl;

        return (
            <video
                autoPlay
                className={classNames('prezly-slate-image__video', className)}
                loop
                muted
                playsInline
                style={style}
                webkit-playsinline
            >
                <source src={sourceWebm} type="video/webm" />
                <source src={sourceMp4} type="video/mp4" />
            </video>
        );
    }

    return (
        <img
            alt={typeof children === 'string' ? children : file.filename}
            className={classNames('prezly-slate-image__image', className)}
            src={uploadcareImage.cdnUrl}
            srcSet={uploadcareImage.getSrcSet()}
            style={style}
        />
    );
};

export default Media;
