import { castArray } from '@technically/lodash';

import type { AutoformatRule, MatchRange } from '../types';

export function getMatchRange({
    match,
    trigger,
}: {
    match: string | MatchRange;
    trigger: AutoformatRule['trigger'];
}) {
    let start: string;
    let end: string;

    if (typeof match === 'object') {
        start = match.start;
        end = match.end;
    } else {
        start = match;
        end = start.split('').reverse().join('');
    }

    const triggers: string[] = trigger ? castArray(trigger) : [end.slice(-1)];

    return {
        start,
        end,
        triggers,
    };
}
