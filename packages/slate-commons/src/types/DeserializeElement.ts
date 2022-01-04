export type DeserializeElement = Record<
    string,
    (element: HTMLElement) =>
        | {
              type: string;
              [key: string]: any;
          }
        | undefined
>;
