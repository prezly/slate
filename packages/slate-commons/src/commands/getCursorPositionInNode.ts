import type { Path } from 'slate';
import { Editor, Point } from 'slate';

const getCursorPositionInNode = (editor: Editor, cursorLocation: Point, nodePath: Path) => {
    const nodeStartPoint = Editor.start(editor, nodePath);
    const nodeEndPoint = Editor.end(editor, nodePath);
    const isStart = Point.equals(cursorLocation, nodeStartPoint);
    const isEnd = Point.equals(cursorLocation, nodeEndPoint);
    return { isEnd, isStart };
};

export default getCursorPositionInNode;
