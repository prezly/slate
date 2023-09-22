import { useRegisterExtension } from '@prezly/slate-commons';
import { isElementNode } from '@prezly/slate-types';
import { type Editor, type NodeEntry, Transforms } from 'slate';

import type { AllowedBlocksExtensionConfiguration } from './types';

export const EXTENSION_ID = 'AllowedBlocksExtension';

export function AllowedBlocksExtension({ check }: AllowedBlocksExtensionConfiguration) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        normalizeNode(editor: Editor, [node, path]: NodeEntry) {
            if (path.length === 0) {
                return false;
            }

            const result = check(node, path);

            if (result === false) {
                Transforms.removeNodes(editor, { at: path });
                return true;
            }

            if (isElementNode(result)) {
                Transforms.setNodes(editor, result, { at: path });
                return true;
            }

            return false;
        },
    });
}
