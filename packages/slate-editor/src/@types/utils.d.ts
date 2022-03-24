declare module '@prezly/slate-editor/type-utils' {
    type SelectAfterPrefix<T extends string, Prefix extends string> = Extract<
        T,
        `${Prefix}${string}`
    > extends `${Prefix}${infer Rest}`
        ? Rest
        : never;
}
