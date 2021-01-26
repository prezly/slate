import { UploadcareImage, UploadcareImageStoragePayload } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, KeyboardEvent, ReactNode } from 'react';
import Modal from 'react-modal';
import useEvent from 'react-use/lib/useEvent';

import { PinterestButton } from '../../components';
import { Close } from '../../icons';

import './ImagePreview.scss';
import Media from './Media';

interface Props {
    children?: ReactNode;
    className?: string;
    file: UploadcareImageStoragePayload;
    isOpen: boolean;
    onClose: () => void;
}

const ImagePreview: FunctionComponent<Props> = ({ children, className, file, isOpen, onClose }) => {
    const image = UploadcareImage.createFromPrezlyStoragePayload(file);

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

                        <PinterestButton
                            className="prezly-slate-image-preview__pinterest"
                            image={image}
                        />
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
