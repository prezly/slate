import type { Decorate, Extension } from '@prezly/slate-commons';
import type { Editor } from 'slate';

export function createExtensionsDecorators<E extends Editor>(
    editor: E,
    extensions: Extension[],
): Decorate[] {
    return extensions
        .map((extension) => extension.decorate?.(editor, extension))
        .filter((decorate): decorate is Decorate => Boolean(decorate));
}
