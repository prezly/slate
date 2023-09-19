import { useRegisterExtension } from '@prezly/slate-commons';

export function FlashNodesExtension() {
    return useRegisterExtension({
        id: 'FlashNodesExtension',
        withOverrides: (editor) => {
            editor.nodesToFlash = [];

            editor.flash = (from, to) => {
                if (!from || !to) {
                    return;
                }

                editor.nodesToFlash.push([from, to]);
            };

            return editor;
        },
    });
}
