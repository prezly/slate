import { type Element, type SlateEditor } from '@udecode/plate';

type TextBlockFactory<T extends Element> = (props?: Partial<T>) => T;

export interface DefaultTextBlockEditor<T extends Element> {
    createDefaultTextBlock: TextBlockFactory<T>;
}

export function withDefaultTextBlock<T extends Element>(
    createDefaultTextBlock: TextBlockFactory<T>,
) {
    return function <E extends SlateEditor>(editor: E): E & DefaultTextBlockEditor<T> {
        return Object.assign(editor, {
            createDefaultTextBlock,
        });
    };
}
