import type { UploadcareImage } from '@prezly/uploadcare';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { Component, createRef } from 'react';

import { IMAGE_PADDING, IMAGE_SIZE } from './constants';
import './Gallery.scss';
import { GalleryImage } from './GalleryImage';
import { calculateLayout } from './lib';

interface Props extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    images: UploadcareImage[];
    maxViewportWidth?: number;
    padding: 'S' | 'M' | 'L';
    size: 'XS' | 'S' | 'M' | 'L' | 'XL';
    width: number;
}

export class Gallery extends Component<Props> {
    static defaultProps = {
        className: '',
        maxViewportWidth: 800,
    };

    imagesContainerRef = createRef<HTMLDivElement>();

    state = {
        viewportWidth: this.props.width,
    };

    componentDidMount() {
        this.handleResize();
    }

    componentDidUpdate(prevProps: Props) {
        const { padding, size, width } = this.props;
        const paddingChanged = padding !== prevProps.padding;
        const sizeChanged = size !== prevProps.size;
        const widthChanged = width !== prevProps.width;

        if (paddingChanged || sizeChanged || widthChanged) {
            this.handleResize();
        }
    }

    handleResize = () => {
        if (this.imagesContainerRef.current === null) {
            return;
        }

        const { width } = this.props;
        const style = window.getComputedStyle(this.imagesContainerRef.current);
        const horizontalMargin = parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
        this.setState({ viewportWidth: width - horizontalMargin });
    };

    render() {
        const { className, images, maxViewportWidth, padding, size, ...props } = this.props;
        const { viewportWidth } = this.state;
        const margin = IMAGE_PADDING[padding];
        const idealHeight = IMAGE_SIZE[size] + 2 * margin;
        const calculatedLayout = calculateLayout({ idealHeight, images, viewportWidth });

        return (
            <div className={classNames('gallery', className)} {...props}>
                <div
                    className="gallery__images"
                    ref={this.imagesContainerRef}
                    style={{
                        margin: -margin,
                    }}
                >
                    {calculatedLayout.map((row, index) => (
                        <div className="gallery__images-row" key={index}>
                            {row.map(({ width, height, image }) => {
                                const preview = image.resize(maxViewportWidth);

                                return (
                                    <GalleryImage
                                        height={height}
                                        image={image}
                                        key={image.uuid}
                                        style={{
                                            margin,
                                        }}
                                        url={preview.cdnUrl}
                                        width={width}
                                        withBorderRadius={margin > 0}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
