import type { Rect } from 'rangefix';

import { clamp } from '#lodash';

import { PortalOrigin } from './types';

const SCREEN_SAFE_MARGIN = 8;

interface Parameters {
    container: HTMLElement;
    origin: PortalOrigin;
    rect: ClientRect | Rect;
    wrapper: HTMLElement;
}

interface Result {
    left: number;
    top: number;
}

export function getUpdatedPosition({ container, origin, rect, wrapper }: Parameters): Result {
    const containerRect = container.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const isPortalWiderThanElement = rect.width < wrapperRect.width;
    let effectiveOrigin = origin;

    if (effectiveOrigin === PortalOrigin.TOP_RIGHT && isPortalWiderThanElement) {
        effectiveOrigin = PortalOrigin.TOP_MIDDLE;
    }

    const top = rect.top - containerRect.top;
    const left = rect.left - containerRect.left;

    switch (effectiveOrigin) {
        case PortalOrigin.COVER: {
            return {
                top,
                left,
            };
        }

        case PortalOrigin.TOP_MIDDLE: {
            return {
                top: top - wrapperRect.height,
                left: clamp(
                    left - wrapperRect.width / 2 + rect.width / 2,
                    -wrapperRect.left + SCREEN_SAFE_MARGIN,
                    window.innerWidth - wrapperRect.right - SCREEN_SAFE_MARGIN,
                ),
            };
        }

        case PortalOrigin.TOP_RIGHT: {
            return {
                top: top - wrapperRect.height,
                left: left - wrapperRect.width + rect.width,
            };
        }

        case PortalOrigin.BOTTOM_RIGHT: {
            return {
                top: rect.bottom - containerRect.top,
                left: left - wrapperRect.width + rect.width,
            };
        }

        case PortalOrigin.BOTTOM_LEFT: {
            return {
                top: rect.bottom - containerRect.top,
                left,
            };
        }

        default:
            throw new Error('Origin has not been provided.');
    }
}
