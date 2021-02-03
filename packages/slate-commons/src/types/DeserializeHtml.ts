import DeserializeElement from './DeserializeElement';
import DeserializeLeaf from './DeserializeLeaf';

export default interface DeserializeHtml {
    element?: DeserializeElement;
    leaf?: DeserializeLeaf;
}
