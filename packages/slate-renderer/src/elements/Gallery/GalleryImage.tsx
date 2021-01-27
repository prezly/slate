import { UploadcareImage, UPLOADCARE_FILE_DATA_KEY } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { Component, createRef, CSSProperties } from 'react';

import { Media, Rollover } from '../../components';

interface Props {
    className?: string;
    height: number;
    image: UploadcareImage;
    onClick: (image: UploadcareImage) => void;
    style?: CSSProperties;
    url: string;
    width: number;
    withBorderRadius: boolean;
}

interface State {
    horizontalMargin: number;
    isLoading: boolean;
    verticalMargin: number;
}

class GalleryImage extends Component<Props, State> {
    static defaultProps = {
        className: '',
        style: {},
    };

    state = {
        horizontalMargin: 0,
        isLoading: false,
        verticalMargin: 0,
    };

    ref = createRef<HTMLDivElement>();

    componentDidUpdate() {
        this.updateMargins();
    }

    handleIsLoadingChange = (isLoading: boolean) => this.setState({ isLoading });

    updateMargins = () => {
        if (this.ref.current === null) {
            return;
        }

        const style = window.getComputedStyle(this.ref.current);
        const horizontalMargin = parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
        const verticalMargin = parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
        const horizontalMarginChanged = horizontalMargin !== this.state.horizontalMargin;
        const verticalMarginChanged = verticalMargin !== this.state.verticalMargin;

        if (horizontalMarginChanged || verticalMarginChanged) {
            this.setState({ horizontalMargin, verticalMargin });
        }
    };

    getStyle = () => {
        const { horizontalMargin, verticalMargin } = this.state;
        const { height, style, url, width } = this.props;
        return {
            backgroundImage: `url("${url}")`,
            height: height - verticalMargin,
            width: width - horizontalMargin,
            ...style,
        };
    };

    render() {
        const { height, image, onClick, width, withBorderRadius } = this.props;

        const handleClick = () => {
            onClick(image);
        };

        return (
            <Rollover onClick={handleClick}>
                <Media
                    className={classNames('prezly-slate-gallery-image', {
                        'prezly-slate-gallery-image--with-border-radius': withBorderRadius,
                    })}
                    image={image}
                    style={{ height, width }}
                >
                    {image[UPLOADCARE_FILE_DATA_KEY]?.caption}
                </Media>
            </Rollover>
        );
    }
}

export default GalleryImage;
