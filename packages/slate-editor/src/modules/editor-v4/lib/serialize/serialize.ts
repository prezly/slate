import jsonStableStringify from 'json-stable-stringify';
import { createEditor } from 'slate';

import type { Value } from '../../types';

import type { Transform } from './types';
import withoutImageCandidates from './withoutImageCandidates';
import withoutLinkCandidates from './withoutLinkCandidates';
import withoutLoaderBlocks from './withoutLoaderBlocks';

const transforms: Transform[] = [
    withoutLinkCandidates,
    withoutImageCandidates,
    withoutLoaderBlocks,
];

export function serialize(value: Value): string {
    /**
     * Create an editor instance so we can use it with `Transforms` instead of having to
     * manually implement the traversal and unwrapping code.
     * Setting of `editor.children` is not a hack, Slate does it like that too:
     * https://github.com/ianstormtaylor/slate/blob/b616e75d636733733503c724c9084ff53e88dde8/packages/slate-react/src/components/slate.tsx#L25
     */
    const editor = createEditor();
    editor.children = value;

    transforms.forEach((transform) => transform(editor));

    return jsonStableStringify({
        children: editor.children,
        type: 'document',
        version: process.env.SLATE_VERSION,
    });
}
