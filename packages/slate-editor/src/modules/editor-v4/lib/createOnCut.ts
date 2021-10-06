import { Editor, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

const createOnCut = (editor: Editor) => (event: React.ClipboardEvent<HTMLDivElement>): void => {
    event.preventDefault();

    ReactEditor.setFragmentData(editor, event.clipboardData);

    const { selection } = editor;

    if (!selection) {
        return;
    }

    if (Range.isExpanded(selection)) {
        Editor.deleteFragment(editor);
        return;
    }

    // Code above this comment is a refactored copy of `onCut` handler from  `Editable`
    // from `slate-react`.
    // Code below this comment is meant to fix an issue with void element not being removed
    // from editor when cutting it when selection is collapsed.
    // see: https://app.clubhouse.io/prezly/story/20076/cutting-ctrl-x-does-not-work-on-blocks

    const [voidEntry] = Array.from(
        Editor.nodes(editor, {
            match: (node) => Editor.isVoid(editor, node),
        }),
    );

    if (voidEntry) {
        const [, voidEntryPath] = voidEntry;
        Transforms.removeNodes(editor, { at: voidEntryPath, voids: true });
    }
};

export default createOnCut;
