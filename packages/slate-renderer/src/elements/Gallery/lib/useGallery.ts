import { UploadcareImage } from '@prezly/slate-types';
import { useState } from 'react';

interface State {
    image: UploadcareImage | null;
    isNextEnabled: boolean;
    isPreviousEnabled: boolean;
}

interface Actions {
    onClose: () => void;
    onNext: () => void;
    onOpen: (image: UploadcareImage) => void;
    onPrevious: () => void;
}

const useGallery = (images: UploadcareImage[]): [State, Actions] => {
    const [image, setImage] = useState<UploadcareImage | null>(null);
    const currentIndex = image === null ? null : images.indexOf(image);
    const isNextEnabled = typeof currentIndex === 'number' && images.length > 1;
    const isPreviousEnabled = isNextEnabled;

    const onClose = () => {
        setImage(null);
    };

    const onPrevious = () => {
        if (typeof currentIndex === 'number' && isPreviousEnabled) {
            const previousIndex = (images.length + currentIndex - 1) % images.length;
            setImage(images[previousIndex]);
        }
    };

    const onNext = () => {
        if (typeof currentIndex === 'number' && isNextEnabled) {
            const nextIndex = (currentIndex + 1) % images.length;
            setImage(images[nextIndex]);
        }
    };

    return [
        { image, isNextEnabled, isPreviousEnabled },
        { onClose, onNext, onOpen: setImage, onPrevious },
    ];
};

export default useGallery;
