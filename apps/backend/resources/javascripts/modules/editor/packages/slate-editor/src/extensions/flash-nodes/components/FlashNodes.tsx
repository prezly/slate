import type { SlateEditor, TNode } from '@udecode/plate-common';
import { toDOMNode, useEditorState } from '@udecode/plate-common/react';
import type { RefObject } from 'react';
import React, { useEffect, useState } from 'react';

import styles from './FlashNodes.module.scss';

export function FlashNodes({ containerRef }: { containerRef: RefObject<HTMLDivElement> }) {
    const editor = useEditorState();

    return (
        <>
            {editor.nodesToFlash.map(([top, bottom], index) => (
                <Flasher
                    key={index}
                    editor={editor}
                    top={top}
                    containerRef={containerRef}
                    bottom={bottom}
                    onComplete={() =>
                        (editor.nodesToFlash = editor.nodesToFlash.filter(
                            (pair) => pair[0] === top && pair[1] === bottom,
                        ))
                    }
                />
            ))}
        </>
    );
}

function Flasher({
    editor,
    top,
    bottom,
    containerRef,
    onComplete,
}: {
    editor: SlateEditor;
    top: TNode;
    bottom: TNode;
    containerRef: RefObject<HTMLDivElement>;
    onComplete: () => void;
}) {
    const [rect, setRect] = useState<Partial<DOMRect> | undefined>(undefined);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        try {
            const containerRect = containerRef.current.getBoundingClientRect();
            const rectA = toDOMNode(editor, top)?.getBoundingClientRect();
            const rectB = toDOMNode(editor, bottom)?.getBoundingClientRect();

            if (rectA && rectB) {
                setRect({
                    top: rectA.top - containerRect.top,
                    height: rectB.bottom - rectA.top,
                    left: Math.min(rectA.left, rectB.left) - containerRect.left,
                    width: Math.max(rectA.width, rectB.width),
                });
            }
        } catch (error) {
            console.error(error);
            onComplete();
        }
    }, []);

    return <div className={styles.flash} onAnimationEnd={() => onComplete()} style={rect} />;
}
