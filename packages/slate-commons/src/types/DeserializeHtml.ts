import type { DeserializeElement } from './DeserializeElement';
import type { DeserializeLeaf } from './DeserializeLeaf';

export interface DeserializeHtml {
    element?: DeserializeElement;
    elementFallback?: DeserializeElement;
    leaf?: DeserializeLeaf;
}
