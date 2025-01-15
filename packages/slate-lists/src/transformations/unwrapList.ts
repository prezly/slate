import { type Location, PointApi, RangeApi, type SlateEditor, type Span } from '@udecode/plate';

import { getListItems } from '../lib';
import type { ListsSchema } from '../types';

import { decreaseDepth } from './decreaseDepth';

/**
 * Unwraps all "list-items" in the current selection.
 * No lists will be left in the current selection.
 */
export function unwrapList(
    editor: SlateEditor,
    schema: ListsSchema,
    at: Location | null = editor.selection,
): boolean {
    if (!at) {
        return false;
    }

    let iterations = 0;

    const span = toSpan(at);
    const start = editor.api.pathRef(span[0]);
    const end = editor.api.pathRef(span[1]);

    editor.tf.withoutNormalizing(() => {
        do {
            if (!start.current || !end.current) {
                break;
            }

            const location: Span = [start.current, end.current];

            const items = getListItems(editor, schema, location);

            if (items.length === 0) {
                break;
            }

            iterations++;

            decreaseDepth(editor, schema, location);
        } while (iterations < 1000);

        if (iterations >= 1000) {
            throw new Error(
                'Too many iterations. Most likely there is a bug causing an infinite loop.',
            );
        }
    });

    start.unref();
    end.unref();

    return iterations > 0;
}

function toSpan(at: Location): Span {
    if (RangeApi.isRange(at)) {
        const [start, end] = RangeApi.edges(at);
        return [start.path, end.path];
    }

    if (PointApi.isPoint(at)) {
        return [at.path, at.path];
    }

    return [at, at];
}
