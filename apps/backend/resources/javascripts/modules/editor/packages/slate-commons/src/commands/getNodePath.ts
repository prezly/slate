import type { Path, SlateEditor } from '@udecode/plate';

export function getNodePath(
    editor: SlateEditor,
    options: NonNullable<Parameters<typeof editor.api.nodes>[0]>,
): Path | null {
    const [entry] = editor.api.nodes(options);
    return entry ? entry[1] : null;
}
