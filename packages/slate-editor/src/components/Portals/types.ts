import type { ReactNode, RefObject } from 'react';

/**
 * Ideally in the future:
 * - `CursorPortal` is completely replaced by `CursorPortalV2`
 * - `ElementPortal` is replaced by `ElementPortalV2` for all usages except `PortalOrigin.COVER`
 * - When `PortalOrigin.COVER` is the only `PortalOrigin` used throughout the app,
 *   we merge `BasePortal` with `ElementPortal` and remove the `origin` prop
 */
export enum PortalOrigin {
    COVER = 'cover',

    /**
     * @deprecated Use `CursortPortalV2` or `ElementPortalV2` with `placement="top"` instead.
     */
    TOP_MIDDLE = 'top_middle',

    /**
     * @deprecated Use `CursortPortalV2` or `ElementPortalV2` with `placement="top-end"` instead.
     */
    TOP_RIGHT = 'top_right',

    /**
     * @deprecated Use `CursortPortalV2` or `ElementPortalV2` with `placement="bottom-start"` instead.
     */
    BOTTOM_LEFT = 'bottom_left',

    /**
     * @deprecated Use `CursortPortalV2` or `ElementPortalV2` with `placement="bottom-end"` instead.
     */
    BOTTOM_RIGHT = 'bottom_right',
}

export interface PortalProps {
    children: ReactNode;
    className?: string;
    containerRef: RefObject<HTMLElement>;
    origin: PortalOrigin;
    pointerEvents?: boolean;
    preventPositionUpdates?: boolean;
}
