import { KeyboardEvent } from 'react';

import isDeletingBackward from './isDeletingBackward';
import isDeletingForward from './isDeletingForward';

const isDeleting = (event: KeyboardEvent): boolean =>
    isDeletingBackward(event) || isDeletingForward(event);

export default isDeleting;
