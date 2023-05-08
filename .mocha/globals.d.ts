import type { expect as JestExpect } from 'expect';

// Tell TS that we have exposed `jest` expect() function globally
declare global {
    const expect: typeof JestExpect;
}
