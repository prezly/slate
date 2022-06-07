type LeafProperties = Record<string, any>;

type DeserializeMarksFn = (element: HTMLElement) => LeafProperties | undefined;

export type DeserializeMarks = Record<string, DeserializeMarksFn>;
