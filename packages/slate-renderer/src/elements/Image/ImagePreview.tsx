import { UploadcareImageStoragePayload } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';
import Modal from 'react-modal';

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
