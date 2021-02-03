import { Editor, Path, Point } from 'slate';

import findLeafPath from './findLeafPath';

const findLeafPoint = (editor: Editor, point: Point): Point | null => {
    const path = findLeafPath(editor, point.path);

    if (!path) {
        return null;
    }

    if (Path.equals(point.path, path)) {
        const [, end] = Editor.edges(editor, path);

        if (Point.isAfter(point, end)) {
            return end;
        }

        return point;
    }

    return {
        // If the path has changed, we have no way of knowing the new expected `offset`
        // so we may as well guess that it's 0.
        offset: 0,
        path,
    };
};

export default findLeafPoint;
