import type { Extension } from '@prezly/slate-commons';
import type { Node } from '@udecode/plate';
import { createPlatePlugin, type PlatePlugin } from '@udecode/plate/react';

type Configuration = {
    key: 'RichBlocks';
    options: {
        getExtensions(): Extension[];
    };
    api: never;
    transforms: never;
};

export const RichBlocksPlugin: PlatePlugin<Configuration> = createPlatePlugin<
    Configuration['key'],
    Configuration['options'],
    Configuration['api'],
    Configuration['transforms']
>({
    key: 'RichBlocks',
    options: {
        getExtensions: () => [],
    },
}).overrideEditor(({ getOptions }) => {
    const { getExtensions } = getOptions();
    function isRichBlock(node: Node) {
        for (const extension of getExtensions()) {
            if (extension.isRichBlock?.(node)) return true;
        }
        return false;
    }
    return {
        api: {
            isRichBlock,
        },
    };
});
