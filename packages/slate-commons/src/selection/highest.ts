import type { Location, Range } from 'slate';
import { Path, Point } from 'slate';

export function highest(selection: Path): Path;
export function highest(selection: Point): Point;
export function highest(selection: Range): Range;
export function highest(selection: Location): Location {
    if (Path.isPath(selection)) {
        return selection.slice(0, 1) as Path;
    }
    if (Point.isPoint(selection)) {
        return { path: highest(selection.path), offset: 0 };
    }
    return {
        anchor: highest(selection.anchor),
        focus: highest(selection.focus),
    };
}
