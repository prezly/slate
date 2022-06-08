import type { DeserializeElement } from './DeserializeElement';
import type { DeserializeMarks } from './DeserializeMarks';

export interface DeserializeHtml {
    element?: DeserializeElement;
    elementFallback?: DeserializeElement;
    marks?: DeserializeMarks;
}
