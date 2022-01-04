import type { DeserializeElement } from './DeserializeElement';
import type { DeserializeLeaf } from './DeserializeLeaf';

export interface DeserializeHtml {
    element?: DeserializeElement;
    leaf?: DeserializeLeaf;
}
