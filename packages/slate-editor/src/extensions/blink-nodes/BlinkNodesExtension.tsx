import type { Extension } from '@prezly/slate-commons';

export function BlinkNodesExtension(): Extension {
    return {
        id: 'BlinkNodesExtension',
        withOverrides: (editor) => {
            editor.nodesToBlink = [];

            editor.blink = (from, to) => {
                if (!from || !to) {
                    return;
                }

                editor.nodesToBlink.push([from, to]);
            };

            return editor;
        },
    };
}
