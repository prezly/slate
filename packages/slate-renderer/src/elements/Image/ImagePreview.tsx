import { UploadcareImage } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, ReactNode } from 'react';
import Modal from 'react-modal';

// import './ImagePreview.module.scss';

interface Props {
    children?: ReactNode;
    className?: string;
    image: UploadcareImage;
    isOpen: boolean;
    onClose: () => void;
}

const ImagePreview: FunctionComponent<Props> = ({
    children,
    className,
    image,
    isOpen,
    onClose,
}) => (
    <Modal
        className={classNames('prezly-slate-image-preview', className)}
        isOpen={isOpen}
        onRequestClose={onClose}
    >
        {children}

        <img
            alt={image.filename}
            className="prezly-slate-image-preview__image"
            src={image.cdnUrl}
            srcSet={image.getSrcSet()}
        />
    </Modal>
);

export default ImagePreview;
