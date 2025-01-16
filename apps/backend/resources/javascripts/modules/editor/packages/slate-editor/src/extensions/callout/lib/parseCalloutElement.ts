import { CalloutNode } from '@prezly/slate-types';

import { createCallout } from './createCallout';

export function parseCalloutElement(serialized: string): CalloutNode | undefined {
    const parsed = JSON.parse(serialized);

    if (CalloutNode.isCalloutNode(parsed)) {
        return createCallout(parsed);
    }

    return undefined;
}
