import classNames from 'classnames';
import React from 'react';

import { CloseButtonV2 } from '../CloseButtonV2';

import { GalleryLayoutSetting } from './GalleryLayoutSetting';
import styles from './GalleryLayoutSettings.module.scss';

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

export function GalleryLayoutSettings<Padding extends string, Size extends string>({
    className,
    onClose,
    onPaddingChange,
    onSizeChange,
    padding,
    paddingOptions,
    size,
    sizeOptions,
}: Props<Padding, Size>) {
    return (
        <div className={classNames(styles.GalleryLayoutSettings, className)}>
            <div className={styles.Header}>
                <h4 className={styles.Title}>Layout settings</h4>

                <CloseButtonV2 className={styles.CloseButton} onClick={onClose} title="Close" />
            </div>

            <p className={styles.Description}>
                Images in the gallery are positioned automatically for ease of use. You can however
                adjust some settings:
            </p>

            <div className={styles.Inputs}>
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
