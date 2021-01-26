import { UploadcareImage, UploadcareImageStoragePayload } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, KeyboardEvent, ReactNode } from 'react';
import Modal from 'react-modal';
import useEvent from 'react-use/lib/useEvent';

import { Close } from '../../icons';

import Media from '../Media';
import PinterestButton from '../PinterestButton';

import './Lightbox.scss';

interface Props {
    children?: ReactNode;
    className?: string;
    file: UploadcareImageStoragePayload;
    isOpen: boolean;
    onClose: () => void;
}

const Lightbox: FunctionComponent<Props> = ({ children, className, file, isOpen, onClose }) => {
    const image = UploadcareImage.createFromPrezlyStoragePayload(file);

    useEvent('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Esc' && isOpen) {
            onClose();
        }
    });

    return (
        <Modal
            className={classNames('prezly-slate-lightbox', className)}
            isOpen={isOpen}
            onRequestClose={onClose}
        >
            <figure className="prezly-slate-lightbox__figure">
                <div className="prezly-slate-lightbox__image-container">
                    <Media className="prezly-slate-lightbox__image" file={file}>
                        {children}
                    </Media>

                    <div className="prezly-slate-lightbox__actions">
                        <a
                            className="prezly-slate-lightbox__download"
                            href={image.downloadUrl}
                            rel="noreferrer noopener"
                            target="_blank"
                            title="Download"
                        >
                            Download
                        </a>

                        <PinterestButton
                            className="prezly-slate-lightbox__pinterest"
                            image={image.downloadUrl}
                        />
                    </div>
                </div>

                <div className="prezly-slate-lightbox__caption">{children}</div>
            </figure>

            <button
                className="prezly-slate-lightbox__close"
                onClick={onClose}
                type="button"
                title="Esc"
            >
                <Close className="prezly-slate-lightbox__close-icon" />
            </button>
        </Modal>
    );
};

export default Lightbox;
