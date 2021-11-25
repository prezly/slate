import type DeserializeElement from './DeserializeElement';
import type DeserializeLeaf from './DeserializeLeaf';

export default interface DeserializeHtml {
    element?: DeserializeElement;
    leaf?: DeserializeLeaf;
}
