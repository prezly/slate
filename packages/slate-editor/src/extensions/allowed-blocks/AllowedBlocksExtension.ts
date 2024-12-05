import type { Extension } from '@prezly/slate-commons';
import { isElementNode } from '@prezly/slate-types';

import type { AllowedBlocksExtensionConfiguration } from './types';

export const EXTENSION_ID = 'AllowedBlocksExtension';

export function AllowedBlocksExtension({ check }: AllowedBlocksExtensionConfiguration): Extension {
    return {
        id: EXTENSION_ID,
        normalizeNode(editor, [node, path]) {
            if (path.length === 0) {
                return false;
            }

            const result = check(node, path);

            if (result === false) {
                editor.removeNodes({ at: path });
                return true;
            }

            if (isElementNode(result)) {
                editor.setNodes(result, { at: path });
                return true;
            }

            return false;
        },
    };
}
