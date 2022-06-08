type ElementProperties = {
    [key: string]: any;
};

type LeafProperties = {
    [key: string]: any;
};

export type DeserializeElement = <T extends HTMLElement>(node: T) => ElementProperties | undefined;
export type DeserializeMarks = <T extends HTMLElement>(node: T) => LeafProperties | undefined;

export interface DeserializeHtml {
    element?: DeserializeElement;
    elementFallback?: DeserializeElement;
    marks?: DeserializeMarks;
}
