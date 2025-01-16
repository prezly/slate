import type { SlateEditor } from '@udecode/plate-common';
import type { Location } from 'slate';
import { Path, Point } from 'slate';

import { findLeafPath } from './findLeafPath';
import { findLeafPoint } from './findLeafPoint';
import { findLeafRange } from './findLeafRange';

export function findLeafLocation(editor: SlateEditor, location: Location): Location | undefined {
    if (Path.isPath(location)) {
        return findLeafPath(editor, location);
    }

    if (Point.isPoint(location)) {
        return findLeafPoint(editor, location);
    }

    return findLeafRange(editor, location);
}
