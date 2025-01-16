import type { Decorate, Extension } from '@prezly/slate-commons';
import { isNotUndefined } from '@technically/is-not-undefined';
import type { SlateEditor } from '@udecode/plate-common';

export function createExtensionsDecorators<E extends SlateEditor>(
    editor: E,
    extensions: Extension[],
): Decorate[] {
    return extensions.map((extension) => extension.decorate?.(editor)).filter(isNotUndefined);
}
