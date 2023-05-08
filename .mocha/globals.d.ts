import type { expect as Expect } from 'expect';

// Tell TS that we have exposed `jest` expect() function globally
declare global {
    const expect: Expect;
}
