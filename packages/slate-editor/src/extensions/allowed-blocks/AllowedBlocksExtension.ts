import type { Extension } from '@prezly/slate-commons';
import { isElementNode } from '@prezly/slate-types';
import { get } from 'lodash-es';
import { type Editor, type NodeEntry, Transforms } from 'slate';

import type { AllowedBlocksExtensionConfiguration, Block } from './types';

export const EXTENSION_ID = 'AllowedBlocksExtension';

export function AllowedBlocksExtension({ blocks }: AllowedBlocksExtensionConfiguration): Extension {
    return {
        id: EXTENSION_ID,
        normalizeNode(editor: Editor, [node, path]: NodeEntry) {
            // Content is empty, or there's no blocks specified.
            // Nothing to do here.
            if (path.length === 0 || blocks.length === 0) {
                return false;
            }

            const block = get(blocks, Array.from(path)) as Block | undefined;

            if (block) {
                const { types, defaultBlockFn } = block;
                // Check if element in the current path is one of allowed types
                const isAllowedBlock = types.some((type) => isElementNode(node, type));

                // If it's not, we replace it with the default one
                if (!isAllowedBlock) {
                    Transforms.setNodes(editor, defaultBlockFn(), { at: path });
                    return true;
                }
            } else {
                // No blocks allowed for the current path, so we can
                // just remove the nodes.
                Transforms.removeNodes(editor, { at: path });
                return true;
            }

            return false;
        },
    };
}
