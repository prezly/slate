import { UploadcareImage } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, KeyboardEvent, ReactNode } from 'react';
import Modal from 'react-modal';
import useEvent from 'react-use/lib/useEvent';

import { ChevronLeft, ChevronRight, Close } from '../../icons';
import { noop } from '../../lib';

import Media from '../Media';
import PinterestButton from '../PinterestButton';

import './Lightbox.scss';

interface Props {
    children?: ReactNode;
    className?: string;
    image: UploadcareImage | null;
    isNextEnabled?: boolean;
    isPreviousEnabled?: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
}

const Lightbox: FunctionComponent<Props> = ({
    children,
    className,
    image,
    isNextEnabled,
    isPreviousEnabled,
    onClose,
    onNext = noop,
    onPrevious = noop,
}) => {
    useEvent('keydown', (event: KeyboardEvent) => {
        if (image === null) {
            return;
        }

        if (event.key === 'Esc') {
            onClose();
        }

        if (event.key === 'ArrowLeft') {
            onPrevious();
        }

        if (event.key === 'ArrowRight') {
            onNext();
        }
    });

    if (image === null) {
        return <Modal className={classNames('prezly-slate-lightbox', className)} isOpen={false} />;
    }

    return (
        <Modal
            className={classNames('prezly-slate-lightbox', className)}
            isOpen
            onRequestClose={onClose}
        >
            <figure className="prezly-slate-lightbox__figure">
                <div className="prezly-slate-lightbox__nav">
                    <button
                        className="prezly-slate-lightbox__nav-button"
                        disabled={!isPreviousEnabled}
                        onClick={onPrevious}
                        type="button"
                        title="Previous (Left Arrow)"
                    >
                        <ChevronLeft className="prezly-slate-lightbox__nav-button-icon" />
                    </button>

                    <button
                        className="prezly-slate-lightbox__nav-button"
                        disabled={!isNextEnabled}
                        onClick={onNext}
                        type="button"
                        title="Next (Right Arrow)"
                    >
                        <ChevronRight className="prezly-slate-lightbox__nav-button-icon" />
                    </button>
                </div>

                <div className="prezly-slate-lightbox__image-container">
                    <Media className="prezly-slate-lightbox__image" image={image}>
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
                title="Close (Esc)"
            >
                <Close className="prezly-slate-lightbox__close-icon" />
            </button>
        </Modal>
    );
};

export default Lightbox;
