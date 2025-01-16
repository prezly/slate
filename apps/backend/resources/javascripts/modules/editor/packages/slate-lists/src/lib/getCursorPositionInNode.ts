import { type Path, type Point, PointApi, type SlateEditor } from '@udecode/plate';

export function getCursorPositionInNode(
    editor: SlateEditor,
    cursorLocation: Point,
    nodePath: Path,
) {
    const nodeStartPoint = editor.api.start(nodePath);
    const nodeEndPoint = editor.api.end(nodePath);
    const isStart = PointApi.equals(cursorLocation, nodeStartPoint);
    const isEnd = PointApi.equals(cursorLocation, nodeEndPoint);
    return { isEnd, isStart };
}
