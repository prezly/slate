import type { ImageWidth } from '@prezly/slate-types';

export type Size<U extends Unit = Unit> = { value: number; unit: U };

export type SizeString = ImageWidth;

export enum Unit {
    PIXELS = 'px',
    PERCENTS = '%',
}

const ZERO_PIXELS = Size(0, Unit.PIXELS);
const ZERO_PERCENT = Size(0, Unit.PERCENTS);

export function Size(size: Size | string): Size;
export function Size<U extends Unit>(size: Size<U>): Size<U>;
export function Size<U extends Unit>(value: number, unit: U): Size<U>;
export function Size(size: Size | string | number, unit?: Unit): Size {
    if (typeof size === 'string') {
        return fromString(size);
    }
    if (typeof size === 'number') {
        return { value: size, unit: unit as Unit };
    }
    return size;
}

export function unit(size: string): Unit {
    if (size.endsWith('%')) {
        return Unit.PERCENTS;
    }
    if (size.endsWith('px')) {
        return Unit.PIXELS;
    }
    throw new Error(`Invalid size string given: '${size}'.`);
}

function fromString(size: string): Size {
    const value = parseFloat(size);
    return { value, unit: unit(size) };
}

export function toString(size: Size) {
    return `${size.value.toFixed(2)}${size.unit}` as SizeString;
}

export function toPixels(size: Size, containerWidth: number): Size<Unit.PIXELS> {
    const obj = Size(size);
    if (obj.unit === Unit.PIXELS) {
        return obj as Size<Unit.PIXELS>;
    }

    if (containerWidth === 0 || containerWidth === Infinity) {
        return ZERO_PIXELS;
    }

    return Size(containerWidth * obj.value * 0.01, Unit.PIXELS);
}

export function toPercents(size: Size, containerWidth: number): Size<Unit.PERCENTS> {
    const obj = Size(size);
    if (obj.unit === Unit.PERCENTS) {
        return obj as Size<Unit.PERCENTS>;
    }

    if (containerWidth === 0 || containerWidth === Infinity) {
        return ZERO_PERCENT;
    }

    return Size((100.0 * size.value) / containerWidth, Unit.PERCENTS);
}

export function convert<U extends Unit>(size: Size, unit: U, containerWidth: number): Size<U> {
    if (size.unit === unit) {
        return size as Size<U>;
    }
    if (unit === Unit.PIXELS) {
        return toPixels(size, containerWidth) as Size<U>;
    }
    return toPercents(size, containerWidth) as Size<U>;
}

export function clamp<U extends Unit>(
    size: Size<U>,
    minSize: Size,
    maxSize: Size,
    containerWidth: number,
): Size<U> {
    const minn = convert(minSize, size.unit, containerWidth);
    const maxn = convert(maxSize, size.unit, containerWidth);
    return max(min(size, maxn, containerWidth), minn, containerWidth);
}

function min<UA extends Unit, UB extends Unit>(
    a: Size<UA>,
    b: Size<UB>,
    containerWidth: number,
): Size<UA | UB> {
    return cmp(a, b, containerWidth) <= 0 ? a : b;
}

function max<UA extends Unit, UB extends Unit>(
    a: Size<UA>,
    b: Size<UB>,
    containerWidth: number,
): Size<UA | UB> {
    return cmp(a, b, containerWidth) >= 0 ? a : b;
}

function cmp(a: Size | string, b: Size | string, containerWidth: number) {
    const ao = Size(a);
    const bo = convert(Size(b), ao.unit, containerWidth);

    if (ao.value === bo.value) {
        return 0;
    }

    return ao.value < bo.value ? -1 : +1;
}
