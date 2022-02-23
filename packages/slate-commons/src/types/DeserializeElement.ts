export type DeserializeElement = Record<
    string,
    <T extends HTMLElement>(
        element: T,
    ) =>
        | {
              type: string;
              [key: string]: any;
          }
        | undefined
>;
