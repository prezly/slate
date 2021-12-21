import classNames from 'classnames';
import React from 'react';

import { Theme, useToolbarsTheme } from '#modules/themes';

import CloseButtonV2 from '../CloseButtonV2';

import './GalleryLayoutSettings.scss';
import { GalleryLayoutSetting } from './GalleryLayoutSetting';

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

export const GalleryLayoutSettings = <Padding extends string, Size extends string>({
    className,
    onClose,
    onPaddingChange,
    onSizeChange,
    padding,
    paddingOptions,
    size,
    sizeOptions,
}: Props<Padding, Size>) => {
    const theme = useToolbarsTheme();

    return (
        <div className={classNames('gallery-layout-settings', className, {
            'gallery-layout-settings--classic-theme': theme === Theme.CLASSIC,
            'gallery-layout-settings--dark-theme': theme === Theme.DARK,
        })}>
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
}
