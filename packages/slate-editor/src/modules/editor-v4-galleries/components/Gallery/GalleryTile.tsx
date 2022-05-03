import type { UploadcareImage } from '@prezly/uploadcare';
import { isUploadcareImageSizeValid } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { Component, createRef } from 'react';

import { ImageSizeWarning, ImageWithLoadingPlaceholderV2, LoadingPlaceholderV2 } from '#components';

import styles from './GalleryTile.module.scss';

interface Props {
    className?: string;
    height: number;
    image: UploadcareImage;
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

export class GalleryTile extends Component<Props, State> {
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
        const { className, image, url, width, withBorderRadius } = this.props;

        return (
            <div
                className={classNames(styles.galleryTile, className, {
                    [styles.hidden]: !this.state.isLoading,
                    [styles.withBorderRadius]: withBorderRadius,
                })}
                ref={this.ref}
                style={this.getStyle()}
            >
                <ImageWithLoadingPlaceholderV2
                    availableWidth={width}
                    className={styles.image}
                    onIsLoadingChange={this.handleIsLoadingChange}
                    renderLoadingState={({ percent }) => (
                        <LoadingPlaceholderV2.ProgressBar percent={percent} />
                    )}
                    src={url}
                />

                {!isUploadcareImageSizeValid(image) && (
                    <ImageSizeWarning className={styles.sizeWarning} />
                )}
            </div>
        );
    }
}
