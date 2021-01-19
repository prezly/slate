// https://github.com/kisenka/svg-sprite-loader/blob/3daaa32a5faaaac1e211cc40fe22b2964273bf6d/examples/browser-sprite/build/main.js#L345-L349
type BrowserSpriteSymbol = {
    content: string;
    id: string;
    viewBox: string;
};

declare module '*.svg' {
    const url: string;
    export default url;
}
