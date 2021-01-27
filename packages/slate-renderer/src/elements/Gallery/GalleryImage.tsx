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
        margin,
        height: height - 2 * margin,
        width: width - 2 * margin,
    };
};

const GalleryImage: FunctionComponent<Props> = ({ height, image, margin, onClick, width }) => {
    const handleClick = () => {
        onClick(image);
    };

    return (
        <Rollover onClick={handleClick} style={getStyle({ height, margin, width })}>
            <Media
                className={classNames('prezly-slate-gallery-image', {
                    'prezly-slate-gallery-image--with-border-radius': margin > 0,
                })}
                image={image}
            >
                {image.caption}
            </Media>
        </Rollover>
    );
};

export default GalleryImage;
