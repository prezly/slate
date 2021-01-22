declare module '*.scss' {
    // We're not using CSS modules, so these scss imports should be for side effects only.
    const content: never;
    export default content;
}
