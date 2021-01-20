import { ImageNode, UploadcareImage } from '@prezly/slate-types';
import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';

import './Image.scss';

interface Props {
    children?: ReactNode;
    file: ImageNode['file'];
    style?: CSSProperties;
}

const Media: FunctionComponent<Props> = ({ children, file, style }) => {
    const uploadcareImage = UploadcareImage.createFromPrezlyStoragePayload(file);

    if (uploadcareImage.isGif()) {
        const video = uploadcareImage.toVideo().bestQuality();
        const sourceWebm = video.format('webm').cdnUrl;
        const sourceMp4 = video.format('mp4').cdnUrl;

        return (
            <video
                autoPlay
                className="prezly-slate-image__video"
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
            className="prezly-slate-image__image"
            src={uploadcareImage.cdnUrl}
            srcSet={uploadcareImage.getSrcSet()}
            style={style}
        />
    );
};

export default Media;
