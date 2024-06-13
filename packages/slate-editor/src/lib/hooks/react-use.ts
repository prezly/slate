/*
 * This is an ES adapter for react-use CommonJS build.
 *
 * The problem with the react-use ESM build is that it's only working
 * with a permissive interop import logic (typescript / babel),
 * but fails when a named import done from within a node native ES module environment.
 *
 * This adapter re-exports individual hooks as ES-friendly named exports.
 */
import type * as T from 'react-use';
import _useAsyncFn from 'react-use/lib/useAsyncFn.js';
import _useDebounce from 'react-use/lib/useDebounce.js';
import _useEffectOnce from 'react-use/lib/useEffectOnce.js';
import _useGetSet from 'react-use/lib/useGetSet.js';
import _useLatest from 'react-use/lib/useLatest.js';
import _useMount from 'react-use/lib/useMount.js';
import _useMountedState from 'react-use/lib/useMountedState.js';
import _usePrevious from 'react-use/lib/usePrevious.js';
import _useRafLoop from 'react-use/lib/useRafLoop.js';
import _useSize from 'react-use/lib/useSize.js';
import _useUnmount from 'react-use/lib/useUnmount.js';
import _useUpdate from 'react-use/lib/useUpdate.js';
import _useUpdateEffect from 'react-use/lib/useUpdateEffect.js';

function unwrap<T>(module: T | { __esModule: boolean; default: T }): T {
    if (!module) throw new Error('Module is undefined');

    if (typeof module === 'object' && '__esModule' in module && 'default' in module) {
        return module.default;
    }
    return module;
}

export const useAsyncFn: typeof T.useAsyncFn = unwrap(_useAsyncFn);
export const useDebounce: typeof T.useDebounce = unwrap(_useDebounce);
export const useEffectOnce: typeof T.useEffectOnce = unwrap(_useEffectOnce);
export const useGetSet: typeof T.useGetSet = unwrap(_useGetSet);
export const useLatest: typeof T.useLatest = unwrap(_useLatest);
export const useMount: typeof T.useMount = unwrap(_useMount);
export const useMountedState: typeof T.useMountedState = unwrap(_useMountedState);
export const usePrevious: typeof T.usePrevious = unwrap(_usePrevious);
export const useRafLoop: typeof T.useRafLoop = unwrap(_useRafLoop);
export const useSize: typeof T.useSize = unwrap(_useSize);
export const useUnmount: typeof T.useUnmount = unwrap(_useUnmount);
export const useUpdate: typeof T.useUpdate = unwrap(_useUpdate);
export const useUpdateEffect: typeof T.useUpdateEffect = unwrap(_useUpdateEffect);
