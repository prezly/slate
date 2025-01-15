import {
    type Path,
    PathApi,
    type Point,
    type Range,
    RangeApi,
    type SlateEditor,
    type Span,
    SpanApi,
} from '@udecode/plate';

/**
 * Get the cursor position for the given location.
 * Always returns null for expanded selections (Range, Span).
 */
export function getCursorPosition(
    editor: SlateEditor,
    at: Range | Point | Span | Path | null,
): Point | null {
    if (!at) {
        return null;
    }
    if (RangeApi.isRange(at)) {
        return RangeApi.isCollapsed(at) ? at.focus : null;
    }
    if (SpanApi.isSpan(at)) {
        return PathApi.equals(at[0], at[1]) ? getCursorPosition(editor, at[0]) : null;
    }
    if (PathApi.isPath(at)) {
        return editor.api.point(at, { edge: 'start' });
    }
    return at; // Point
}
