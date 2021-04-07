import React, { FunctionComponent } from 'react';
import { UploadcareImageProps } from '../../../types';
import { getPictureDetails } from './lib';
import classNames from '../../../lib/classNames';
import getEffectiveImageSize from './lib/getEffectiveImageSize';

const UploadcareImage: FunctionComponent<UploadcareImageProps> = (props) => {
    const {
        className,
        containerClassName,
        alt,
        layout,
        objectFit,
        imageDetails,
        width,
        height,
        src,
        objectPosition,
        lazy,
    } = props;
    const { sources, image } = getPictureDetails(props);

    const imageStyle =
        layout === 'fixed'
            ? undefined
            : {
                  objectFit,
                  objectPosition,
                  maxHeight: height,
                  maxWidth: width,
                  minHeight: height,
                  minWidth: width,
              };
    const imageSize = getEffectiveImageSize(width, height, imageDetails);

    return (
        <picture className={classNames('uploadcare-image__picture', containerClassName)}>
            {sources.map((source) => (
                <source
                    key={`${src || imageDetails?.uuid}${source.id}`}
                    srcSet={source.srcSet}
                    type={source.type}
                    media={source.media}
                />
            ))}

            <img
                {...imageSize}
                className={classNames(className, layout === 'fill' && 'uploadcare-image__layout-fill')}
                loading={lazy ? 'lazy' : 'eager'}
                alt={alt}
                style={imageStyle}
                src={image.src}
            />
        </picture>
    );
};

export default UploadcareImage;
