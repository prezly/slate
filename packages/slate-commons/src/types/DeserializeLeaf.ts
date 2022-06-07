type LeafProperties = Record<string, any>;

type DeserializeLeafFn = (element: HTMLElement) => LeafProperties | undefined;

export type DeserializeLeaf = Record<string, DeserializeLeafFn>;
