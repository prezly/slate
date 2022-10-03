import type { RefObject } from 'react';
import React, { useEffect, useState } from 'react';
import type { Editor, Node } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

import styles from './BlinkNodes.module.scss';

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
    const [rect, setRect] = useState<Partial<DOMRect> | undefined>(undefined);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        try {
            const containerRect = containerRef.current.getBoundingClientRect();
            const rectA = ReactEditor.toDOMNode(editor, top).getBoundingClientRect();
            const rectB = ReactEditor.toDOMNode(editor, bottom).getBoundingClientRect();

            setRect({
                top: rectA.top - containerRect.top,
                height: rectB.bottom - rectA.top,
                left: Math.min(rectA.left, rectB.left) - containerRect.left,
                width: Math.max(rectA.width, rectB.width),
            });
        } catch (error) {
            console.error(error);
            clear();
        }
    }, []);

    return <div className={styles.blink} onAnimationEnd={() => clear()} style={rect} />;
}
