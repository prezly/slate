import type { Location, Range } from 'slate';
import { Path, Point } from 'slate';

export function highest(selection: Path): Path;
export function highest(selection: Point): Path;
export function highest(selection: Range): Path;
export function highest(selection: Location): Path {
    if (Path.isPath(selection)) {
        return selection.slice(0, 1) as Path;
    }
    if (Point.isPoint(selection)) {
        return highest(selection.path);
    }
    return highest(selection.focus);
}
