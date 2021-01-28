import { UploadcareImage } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { CSSProperties, FunctionComponent } from 'react';

import { Media, Rollover } from '../../components';

import './GalleryImage.scss';

interface Props {
    height: number;
    image: UploadcareImage;
    margin: number;
    onClick: (image: UploadcareImage) => void;
    width: number;
}

const getStyle = (props: Pick<Props, 'height' | 'margin' | 'width'>): CSSProperties => {
    const { height, margin, width } = props;

    return {
        height: height - 2 * margin,
        margin,
        width: width - 2 * margin,
    };
};

const GalleryImage: FunctionComponent<Props> = ({ height, image, margin, onClick, width }) => {
    const handleClick = () => {
        onClick(image);
    };

    return (
        <Rollover
            className={classNames('prezly-slate-gallery-image', {
                'prezly-slate-gallery-image--with-border-radius': margin > 0,
            })}
            caption={image.caption}
            onClick={handleClick}
            style={getStyle({ height, margin, width })}
        >
            <Media className="prezly-slate-gallery-image__media" image={image}>
                {image.caption}
            </Media>
        </Rollover>
    );
};

export default GalleryImage;
