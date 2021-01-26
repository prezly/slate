import { UploadcareImage, UploadcareImageStoragePayload } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, KeyboardEvent, ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import Modal from 'react-modal';
import useEvent from 'react-use/lib/useEvent';
import striptags from 'striptags';

import { Close, Pinterest } from '../../icons';
import { openWindow } from '../../lib';

import './ImagePreview.scss';
import Media from './Media';

interface Props {
    children?: ReactNode;
    className?: string;
    file: UploadcareImageStoragePayload;
    isOpen: boolean;
    onClose: () => void;
}

const getPinterestShareUrl = (description: string, url: string, image?: string): string => {
    const parameters = {
        description: encodeURIComponent(description),
        media: image ? encodeURIComponent(image) : undefined,
        url: encodeURIComponent(url),
    };

    const parametersString = Object.entries(parameters)
        .filter(([value]) => value)
        .map((entry) => entry.join('='))
        .join('&');

    return `https://pinterest.com/pin/create/button/?${parametersString}`;
};

const ImagePreview: FunctionComponent<Props> = ({ children, className, file, isOpen, onClose }) => {
    const image = UploadcareImage.createFromPrezlyStoragePayload(file);

    const handlePinterestClick = () => {
        const description = striptags(renderToString(<>{children}</>));
        const url = getPinterestShareUrl(description, document.location.href, image.downloadUrl);
        openWindow(url, 575, 400);
    };

    useEvent('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Esc' && isOpen) {
            onClose();
        }
    });

    return (
        <Modal
            className={classNames('prezly-slate-image-preview', className)}
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            <figure className="prezly-slate-image-preview__figure">
                <div className="prezly-slate-image-preview__image-container">
                    <Media className="prezly-slate-image-preview__image" file={file}>
                        {children}
                    </Media>

                    <div className="prezly-slate-image-preview__actions">
                        <a
                            className="prezly-slate-image-preview__download"
                            href={image.downloadUrl}
                            rel="noreferrer noopener"
                            target="_blank"
                            title="Download"
                        >
                            Download
                        </a>

                        <button
                            className="prezly-slate-image-preview__pinterest"
                            onClick={handlePinterestClick}
                            title="Pin"
                            type="button"
                        >
                            <Pinterest className="prezly-slate-image-preview__pinterest-icon" />
                        </button>
                    </div>
                </div>

                <div className="prezly-slate-image-preview__caption">{children}</div>
            </figure>

            <button
                className="prezly-slate-image-preview__close"
                onClick={onClose}
                type="button"
                title="Esc"
            >
                <Close className="prezly-slate-image-preview__close-icon" />
            </button>
        </Modal>
    );
};

export default ImagePreview;
