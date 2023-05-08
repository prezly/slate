import type { expect as JestExpect } from 'jest-expect';

// Tell TS that we have exposed `jest` expect() function globally
declare global {
    const expect: JestExpect;
}
