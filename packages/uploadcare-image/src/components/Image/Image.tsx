import React, { FunctionComponent } from 'react';
import { UploadcareImage } from '../Uploadcare';
import { ImageExtension, UploadcareImageProps } from '../../types';

export type Props = UploadcareImageProps;

const Image: FunctionComponent<Props> = (props) => {
    const { filename, src } = props;

    const extension = (src || filename)?.split('?')[0].match(/\.(?<extension>\w+)$/)?.groups
        ?.extension as ImageExtension | null;

    // If it's a svg then there is no need for responsive image
    if (extension === 'svg') {
        const { sizes, objectFit, layout, lazy, containerClassName, ...imgProps } = props;
        return <img {...imgProps} loading={lazy ? 'lazy' : 'eager'} />;
    }

    // If it's a gif image then show it as a video, using Uploadcare's gif2video transformation
    if (extension === 'gif') {
        // To be implemented
    }

    // By default fallback to UploadcareImage with webp/png result formats
    return <UploadcareImage defaultFormat="png" formats={['webp', 'png']} {...props} />;
};

export default Image;
