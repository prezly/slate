import type { BaseEditor, Element } from 'slate';

type TextBlockFactory<T extends Element> = (props?: Partial<T>) => T;

export interface DefaultTextBlockEditor<T extends Element> extends BaseEditor {
    createDefaultTextBlock: TextBlockFactory<T>;
}

export function withDefaultTextBlock<T extends Element>(
    createDefaultTextBlock: TextBlockFactory<T>,
) {
    return function <E extends BaseEditor>(editor: E): E & DefaultTextBlockEditor<T> {
        return Object.assign(editor, {
            createDefaultTextBlock,
        });
    };
}
