import type { NodeEntry } from 'slate';

import { getUnreachableAncestors } from './getUnreachableAncestors';

describe('getUnreachableAncestors', () => {
    it('should return unreachable ancestors paths for the given node entries', () => {
        const RED: NodeEntry = [{ children: [] }, [0]];
        const RED_ONE: NodeEntry = [{ children: [] }, [0, 0]];
        const GREEN: NodeEntry = [{ children: [] }, [1]];
        const GREEN_ONE: NodeEntry = [{ children: [] }, [1, 2]];
        const GREEN_TWO: NodeEntry = [{ children: [] }, [1, 3]];
        const BLUE: NodeEntry = [{ children: [] }, [2, 0]];

        const ancestors = getUnreachableAncestors([RED, RED_ONE, GREEN, GREEN_ONE, GREEN_TWO, BLUE]);

        expect(ancestors).toEqual([RED, GREEN, BLUE]);
    });
});
