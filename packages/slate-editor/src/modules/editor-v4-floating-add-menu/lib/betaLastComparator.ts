import { Option } from '../types';

/**
 * A comparator which, when used with `Array.prototype.sort`, will sort the
 * options so the ones with `beta` come last, and it will preserve the order
 * of all `beta` options as it was in the original list.
 */
export default function betaLastComparator(a: Option, b: Option): -1 | 0 | 1 {
    if (a.beta && !b.beta) {
        return 1;
    }

    if (!a.beta && b.beta) {
        return -1;
    }

    return 0;
}
