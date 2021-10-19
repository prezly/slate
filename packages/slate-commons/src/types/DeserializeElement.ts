type DeserializeElement = Record<
    string,
    (element: HTMLElement) =>
        | {
              type: string;
              [key: string]: any;
          }
        | undefined
>;

// eslint-disable-next-line no-undef
export default DeserializeElement;
