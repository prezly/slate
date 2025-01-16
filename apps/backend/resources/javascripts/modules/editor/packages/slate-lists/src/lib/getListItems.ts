import {
    type Path,
    PathApi,
    PointApi,
    RangeApi,
    type Span,
    SpanApi,
    type Element,
    type Location,
    type NodeEntry,
    type SlateEditor,
} from '@udecode/plate';

import type { ListsSchema } from '../types';

/**
 * Returns all "list-items" in a given Range.
 */
export function getListItems(
    editor: SlateEditor,
    schema: ListsSchema,
    at: Location | Span | null = editor.selection,
): NodeEntry<Element>[] {
    if (!at) {
        return [];
    }

    const start = getLocationStart(at);
    const listItems = editor.api.nodes({
        at,
        match: schema.isListItemNode,
    });

    return Array.from(listItems).filter(([, path]) => {
        const [, grandparent] = PathApi.ancestors(start, { reverse: true });
        const rangeIsGrandhild = PathApi.equals(path, grandparent);
        const rangeIsDescendant = PathApi.isDescendant(start, path);
        const rangeStartsAfter = PathApi.isAfter(start, path);

        if (rangeIsDescendant) {
            // There's just one case where we want to include a "list-item" that is
            // an ancestor of the range starting point - when it's a grandparent of that point.
            // It's because the selection starting point will be in a grandchild `{ text: '' }` node.
            // <h-li>                       <--- grandparent
            //     <h-li-text>
            //         <h-text>             <--- grandchild
            //             <anchor />       <--- range starting point
            //         </h-text>
            //     </h-li-text>
            // </h-li>
            // Other ancestors are not "visually" in selection, but they are returned by `Editor.nodes`.
            return !rangeStartsAfter && rangeIsGrandhild;
        }

        return !rangeStartsAfter;
    }) as NodeEntry<Element>[];
}

function getLocationStart(location: Location | Span): Path {
    if (RangeApi.isRange(location)) {
        return RangeApi.start(location).path;
    }
    if (PointApi.isPoint(location)) {
        return location.path;
    }
    if (SpanApi.isSpan(location)) {
        const [start, end] = location;
        return PathApi.compare(start, end) <= 0 ? start : end;
    }
    return location;
}
