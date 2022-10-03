import type { Ref, RefObject } from 'react';
import React from 'react';
import type { Editor, Node } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

export function BlinkNodes({ containerRef }: { containerRef: RefObject<HTMLDivElement> }) {
    const editor = useSlateStatic();

    return (
        <>
            {editor.nodesToBlink.map(([top, bottom], index) => (
                <Blinker
                    key={index}
                    editor={editor}
                    top={top}
                    containerRef={containerRef}
                    bottom={bottom}
                    clear={() =>
                        (editor.nodesToBlink = editor.nodesToBlink.filter((_, i) => i !== index))
                    }
                />
            ))}
        </>
    );
}

function Blinker({
    editor,
    top,
    bottom,
    containerRef,
    clear,
}: {
    editor: Editor;
    top: Node;
    bottom: Node;
    containerRef: RefObject<HTMLDivElement>;
    clear: () => void;
}) {
    const [rect, setRect] = React.useState<{ top: number; height: number } | undefined>(undefined);

    React.useEffect(() => {
        try {
            const rectA = ReactEditor.toDOMNode(editor, top).getBoundingClientRect();
            const rectB = ReactEditor.toDOMNode(editor, bottom).getBoundingClientRect();
            setRect({
                top: containerRef.current
                    ? rectA.top - containerRef.current.getBoundingClientRect().top
                    : rectA.top,
                height: rectB.bottom - rectA.top,
            });
        } finally {
            // clear();
        }
    }, []);

    return (
        <div
            style={
                rect
                    ? {
                          top: rect.top,
                          height: rect.height,
                          width: '100%',
                          background: 'red',
                          position: 'absolute',
                          opacity: 0.5,
                      }
                    : undefined
            }
        />
    );
}
