import { cloneElement, isValidElement, ReactNode } from 'react';

const appendKeyToValidElement = (element: ReactNode, key: string | number): ReactNode => {
    if (isValidElement(element) && element.key === null) {
        return cloneElement(element, { key });
    }

    return element;
};

export default appendKeyToValidElement;
