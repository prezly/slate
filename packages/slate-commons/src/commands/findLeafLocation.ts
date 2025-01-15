import { PathApi, PointApi, type Location, type SlateEditor } from '@udecode/plate';

import { findLeafPath } from './findLeafPath';
import { findLeafPoint } from './findLeafPoint';
import { findLeafRange } from './findLeafRange';

export function findLeafLocation(editor: SlateEditor, location: Location): Location | undefined {
    if (PathApi.isPath(location)) {
        return findLeafPath(editor, location);
    }

    if (PointApi.isPoint(location)) {
        return findLeafPoint(editor, location);
    }

    return findLeafRange(editor, location);
}
