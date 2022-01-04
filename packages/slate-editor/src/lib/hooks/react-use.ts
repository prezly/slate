/*
 * This is an ES adapter for react-use CommonJS build.
 *
 * The problem with the react-use ESM build is that it's only working
 * with a permissive interop import logic (typescript / babel),
 * but fails when a named import done from within a node native ES module environment.
 *
 * This adapter re-exports individual hooks as ES-friendly named exports.
 */
export { default as useAsyncFn } from 'react-use/lib/useAsyncFn.js';
export { default as useDebounce } from 'react-use/lib/useDebounce.js';
export { default as useEffectOnce } from 'react-use/lib/useEffectOnce.js';
export { default as useLatest } from 'react-use/lib/useLatest.js';
export { default as useMount } from 'react-use/lib/useMount.js';
export { default as useMountedState } from 'react-use/lib/useMountedState.js';
export { default as useRafLoop } from 'react-use/lib/useRafLoop.js';
export { default as useSize } from 'react-use/lib/useSize.js';
export { default as useUnmount } from 'react-use/lib/useUnmount.js';
export { default as useUpdate } from 'react-use/lib/useUpdate.js';
