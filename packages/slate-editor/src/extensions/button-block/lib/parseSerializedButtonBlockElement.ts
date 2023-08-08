import { ButtonBlockNode } from '../ButtonBlockNode';

import { createButtonBlock } from './createButtonBlock';

export function parseSerializedButtonBlockElement(serialized: string): ButtonBlockNode | undefined {
    const parsed = JSON.parse(serialized);

    if (ButtonBlockNode.isButtonBlockNode(parsed)) {
        return createButtonBlock(parsed);
    }

    return undefined;
}
