type ElementProperties = {
    type: string;
    [key: string]: any;
};

type DeserializeElementFn = <T extends HTMLElement>(element: T) => ElementProperties | undefined;

export type DeserializeElement = Record<string, DeserializeElementFn>;
