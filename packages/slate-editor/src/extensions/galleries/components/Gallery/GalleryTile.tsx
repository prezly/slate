import type { UploadcareImage } from '@prezly/uploadcare';
import { isUploadcareImageSizeValid } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { Component, createRef } from 'react';

import { ImageSizeWarning, ImageWithLoadingPlaceholder } from '#components';

import styles from './GalleryTile.module.scss';

interface Props {
    image: UploadcareImage;
    url: string;
    width: number;
    height: number;
    withBorderRadius: boolean;
    // Generic
    style?: CSSProperties;
    className?: string;
}

interface State {
    loaded: boolean;
    horizontalMargin: number;
    verticalMargin: number;
}

export class GalleryTile extends Component<Props, State> {
    static defaultProps = {
        className: '',
        style: {},
    };

    state = {
        loaded: false,
        horizontalMargin: 0,
        verticalMargin: 0,
    };

    ref = createRef<HTMLDivElement>();

    componentDidUpdate() {
        this.updateMargins();
    }

    handleOnLoad = () => this.setState({ loaded: true });

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

    getStyle = (): CSSProperties => {
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
        const { className, image, url, withBorderRadius } = this.props;
        const { width, height } = image.dimensions;

        return (
            <div
                className={classNames(styles.GalleryTile, className, {
                    [styles.withBorderRadius]: withBorderRadius,
                })}
                ref={this.ref}
                style={this.getStyle()}
            >
                {!this.state.loaded && (
                    <ImageWithLoadingPlaceholder
                        className={classNames(styles.Image, {
                            [styles.loaded]: this.state.loaded,
                        })}
                        onLoad={this.handleOnLoad}
                        src={url}
                        imageWidth={width}
                        imageHeight={height}
                    />
                )}
                {!isUploadcareImageSizeValid(image) && (
                    <ImageSizeWarning className={styles.SizeWarning} />
                )}
            </div>
        );
    }
}
