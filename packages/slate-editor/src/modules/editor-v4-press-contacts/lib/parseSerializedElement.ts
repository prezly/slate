import { PressContactElementType } from '../types';

import createPressContact from './createPressContact';
import isPressContactElement from './isPressContactElement';

const parseSerializedElement = (serialized: string): PressContactElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isPressContactElement(parsed)) {
        return createPressContact(parsed.contact);
    }

    return undefined;
};

export default parseSerializedElement;
