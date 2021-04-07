import { Sizes } from '../../types';

export enum Breakpoint {
    XS = 576,
    SM = 768,
    MD = 992,
    LG = 1200,
    XL = 1920,
}

const respondAbove = (breakpoint: Breakpoint) => `(min-width: ${breakpoint}px)`;
const respondBetween = (lower: Breakpoint, upper: Breakpoint) =>
    `(min-width: ${lower}px) and (max-width: ${upper - 1}px)`;

export const MediaBreakpoints: Record<keyof Sizes, string> = {
    mobile: respondBetween(1, Breakpoint.SM),
    tablet: respondBetween(Breakpoint.SM, Breakpoint.MD),
    notMobile: respondAbove(Breakpoint.SM),
    mobileAndTablet: respondBetween(1, Breakpoint.MD),
    desktop: respondBetween(Breakpoint.MD, Breakpoint.LG),
    notDesktop: respondBetween(1, Breakpoint.MD),
    desktopXl: respondAbove(Breakpoint.LG),
    notDesktopXl: respondBetween(1, Breakpoint.LG),
    allDesktops: respondAbove(Breakpoint.MD),
    default: '',
};

export const DefaultImageSize: Record<keyof Sizes, number> = {
    mobile: Breakpoint.SM,
    tablet: Breakpoint.MD,
    notMobile: Breakpoint.LG,
    mobileAndTablet: Breakpoint.MD,
    desktop: Breakpoint.LG,
    notDesktop: Breakpoint.MD,
    desktopXl: Breakpoint.XL,
    notDesktopXl: Breakpoint.LG,
    allDesktops: Breakpoint.XL,
    default: Breakpoint.XL,
};
