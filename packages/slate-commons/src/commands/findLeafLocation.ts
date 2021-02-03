import { Editor, Location, Path, Point } from 'slate';

import findLeafPath from './findLeafPath';
import findLeafPoint from './findLeafPoint';
import findLeafRange from './findLeafRange';

const findLeafLocation = (editor: Editor, location: Location): Location | null => {
    if (Path.isPath(location)) {
        return findLeafPath(editor, location);
    }

    if (Point.isPoint(location)) {
        return findLeafPoint(editor, location);
    }

    return findLeafRange(editor, location);
};

export default findLeafLocation;
