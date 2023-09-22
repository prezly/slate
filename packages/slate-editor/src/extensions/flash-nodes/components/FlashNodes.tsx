import React, { useEffect, useState } from 'react';
import type { Editor, Node } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';

import styles from './FlashNodes.module.scss';

interface Props {
    containerElement: HTMLElement | null | undefined;
}

export function FlashNodes({ containerElement }: Props) {
    const editor = useSlateStatic();

    return (
        <>
            {editor.nodesToFlash.map(([top, bottom], index) => (
                <Flasher
                    key={index}
                    editor={editor}
                    top={top}
                    containerElement={containerElement}
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

function Flasher(props: {
    editor: Editor;
    top: Node;
    bottom: Node;
    containerElement: HTMLElement | null | undefined;
    onComplete: () => void;
}) {
    const { editor, top, bottom, containerElement, onComplete } = props;
    const [rect, setRect] = useState<Partial<DOMRect> | undefined>(undefined);

    useEffect(() => {
        if (!containerElement) {
            return;
        }

        try {
            const containerRect = containerElement.getBoundingClientRect();
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
            onComplete();
        }
    }, [containerElement]);

    return <div className={styles.flash} onAnimationEnd={() => onComplete()} style={rect} />;
}
