import { type TElement } from '@udecode/plate';
import { createPlatePlugin } from '@udecode/plate/react';

type TextBlockFactory<T extends TElement> = (props?: Partial<T>) => T;

type Options<T> = {
    createDefaultTextBlock(): TextBlockFactory<T>;
};

export const DefaultTextBlockPlugin = {
    configure<T extends TElement>(config: { options: Options<T> }) {
        return createPlatePlugin<'DefaultTextBlock', Options<T>>({
            key: 'DefaultTextBlock',
            options: config.options,
        }).overrideEditor(({ getOptions }) => {
            const { createDefaultTextBlock } = getOptions();
            return {
                api: {
                    createDefaultTextBlock,
                },
            };
        });
    },
};
