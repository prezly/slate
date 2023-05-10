export type SelectAfterPrefix<T extends string, Prefix extends string> = Extract<
    T,
    `${Prefix}${string}`
> extends `${Prefix}${infer Rest}`
    ? Rest
    : never;
