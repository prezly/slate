export interface DeserializeHtml {
    element?: DeserializeElement;
    elementFallback?: DeserializeElement;
    marks?: DeserializeMarks;
}

export type DeserializeElement = <T extends HTMLElement>(element: T) => ElementProperties | undefined;
export type DeserializeMarks = (element: HTMLElement) => LeafProperties | undefined;

type ElementProperties = {
    [key: string]: any;
};

type LeafProperties = {
    [key: string]: any;
};
