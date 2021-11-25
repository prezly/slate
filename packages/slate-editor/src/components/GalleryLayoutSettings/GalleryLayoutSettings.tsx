import classNames from 'classnames';
import * as React from 'react';

import CloseButtonV2 from '../CloseButtonV2';

import GalleryLayoutSetting from './GalleryLayoutSetting';
import './GalleryLayoutSettings.scss';

interface Props<Padding extends string, Size extends string> {
    className?: string;
    onClose: () => void;
    onPaddingChange: (padding: Padding) => void;
    onSizeChange: (size: Size) => void;
    padding: Padding;
    paddingOptions: { label: string; value: Padding }[];
    size: Size;
    sizeOptions: { label: string; value: Size }[];
}

const GalleryLayoutSettings = <Padding extends string, Size extends string>({
    className,
    onClose,
    onPaddingChange,
    onSizeChange,
    padding,
    paddingOptions,
    size,
    sizeOptions,
}: Props<Padding, Size>) => (
    <div className={classNames('gallery-layout-settings', className)}>
        <div className="gallery-layout-settings__header">
            <h4 className="gallery-layout-settings__title">Layout settings</h4>

            <CloseButtonV2
                className="gallery-layout-settings__close-button"
                onClick={onClose}
                title="Close"
            />
        </div>

        <p className="gallery-layout-settings__description">
            Images in the gallery are positioned automatically for ease of use. You can however
            adjust some settings:
        </p>

        <div className="gallery-layout-settings__inputs">
            <GalleryLayoutSetting<Size>
                label="Image preview size"
                name="thumbnail-size"
                onChange={onSizeChange}
                options={sizeOptions}
                value={size}
            />

            <GalleryLayoutSetting<Padding>
                label="Space between images"
                name="thumbnail-spacing"
                onChange={onPaddingChange}
                options={paddingOptions}
                value={padding}
            />
        </div>
    </div>
);

export default GalleryLayoutSettings;
