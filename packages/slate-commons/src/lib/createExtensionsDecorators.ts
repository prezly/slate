import type { Editor } from 'slate';

import type { Decorate, Extension } from '../types';

export function createExtensionsDecorators<E extends Editor>(
    editor: E,
    extensions: Extension[],
): Decorate[] {
    return extensions
        .map((extension) => extension.decorate?.(editor, extension))
        .filter((decorate): decorate is Decorate => Boolean(decorate));
}
