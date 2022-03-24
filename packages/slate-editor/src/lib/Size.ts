export type Size<U extends Unit = Unit> = [number, U];

export enum Unit {
    PIXELS = 'px',
    PERCENTS = '%',
}

export const VALUE = 0;
export const UNIT = 1;

export function fromPixels(value: number): Size<Unit.PIXELS> {
    return [value, Unit.PIXELS];
}

export function fromPercents(value: number): Size<Unit.PERCENTS> {
    return [value, Unit.PERCENTS];
}

export function fromString(size: string): Size {
    const value = parseFloat(size);
    if (size.endsWith(Unit.PIXELS)) {
        return [value, Unit.PIXELS];
    }
    if (size.endsWith('%')) {
        return [value, Unit.PERCENTS];
    }
    throw new Error(`Invalid size string given: '${size}'.`);
}

export function cmp(a: Size, b: Size, containerWidth: number) {
    const bNormalized = toUnit(b, a[UNIT], containerWidth);

    if (a[VALUE] === bNormalized[VALUE]) {
        return 0;
    }

    return a[VALUE] < bNormalized[VALUE] ? -1 : +1;
}

export function toString(size: Size): string {
    return `${size[VALUE].toFixed(2)}${size[UNIT]}`;
}

export function toPixels(size: Size, containerWidth: number): Size<Unit.PIXELS> {
    if (size[UNIT] === Unit.PIXELS) {
        return size as Size<Unit.PIXELS>;
    }

    if (containerWidth === 0 || containerWidth === Infinity) {
        return fromPixels(0);
    }

    return fromPixels(containerWidth * size[VALUE] * 0.01);
}

export function toPercents(size: Size, containerWidth: number): Size<Unit.PERCENTS> {
    if (size[UNIT] === Unit.PERCENTS) {
        return size as Size<Unit.PERCENTS>;
    }

    if (containerWidth === 0 || containerWidth === Infinity) {
        return fromPercents(0);
    }

    return fromPercents((100.0 * size[VALUE]) / containerWidth);
}

export function toUnit<U extends Unit>(size: Size, unit: U, containerWidth: number): Size<U> {
    if (size[UNIT] === unit) {
        return size as Size<U>;
    }
    if (unit === Unit.PIXELS) {
        return toPixels(size, containerWidth) as Size<U>;
    }
    return toPercents(size, containerWidth) as Size<U>;
}

export function add<U extends Unit>(a: Size<U>, b: Size, containerWidth: number): Size<U> {
    const bNormalized = toUnit(b, a[UNIT], containerWidth);

    return [a[VALUE] + bNormalized[VALUE], a[UNIT]];
}

export function clamp<U extends Unit>(
    size: Size<U>,
    minSize: Size,
    maxSize: Size,
    containerWidth: number,
): Size<U> {
    const minNormalized = toUnit(minSize, size[UNIT], containerWidth);
    const maxNormalized = toUnit(maxSize, size[UNIT], containerWidth);
    return max(min(size, maxNormalized, containerWidth), minNormalized, containerWidth);
}

export function min<UA extends Unit, UB extends Unit>(
    a: Size<UA>,
    b: Size<UB>,
    containerWidth: number,
): Size<UA | UB> {
    const c = cmp(a, b, containerWidth);

    return c <= 0 ? a : b;
}

export function max<UA extends Unit, UB extends Unit>(
    a: Size<UA>,
    b: Size<UB>,
    containerWidth: number,
): Size<UA | UB> {
    const c = cmp(a, b, containerWidth);

    return c >= 0 ? a : b;
}
