import {
    type Location,
    type Path,
    PathApi,
    type Point,
    PointApi,
    type Range,
} from '@udecode/plate';

export function highest(selection: Path): Path;
export function highest(selection: Point): Path;
export function highest(selection: Range): Path;
export function highest(selection: Location): Path {
    if (PathApi.isPath(selection)) {
        return selection.slice(0, 1) as Path;
    }
    if (PointApi.isPoint(selection)) {
        return highest(selection.path);
    }
    return highest(selection.focus);
}
