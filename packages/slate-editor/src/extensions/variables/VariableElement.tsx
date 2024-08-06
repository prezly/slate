import { isVariableNode, type VariableNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { useState } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected, useSlateStatic } from 'slate-react';

import type { Variable } from './types';
import styles from './VariableElement.module.scss';
import { VariableMenu } from './VariableMenu';

interface Props extends RenderElementProps {
    element: VariableNode;
    variables: Variable[];
}

export function VariableElement({ attributes, children, element, variables }: Props) {
    const selected = useSelected();
    const editor = useSlateStatic();

    const [container, setContainer] = useState<HTMLSpanElement | null>(null);

    const variable = variables.find(({ key }) => key === element.key);
    const selectedNodes = Array.from(editor.nodes({ mode: 'lowest' }));
    const isOnlyVariableSelected =
        selectedNodes.length === 1 && selectedNodes.every(([node]) => isVariableNode(node));

    return (
        <>
            {selected && isOnlyVariableSelected && container && (
                <VariableMenu container={container} element={element} variables={variables} />
            )}
            <span
                {...attributes}
                className={classNames(styles.VariableElement, {
                    [styles.selected]: selected,
                })}
                ref={(ref) => {
                    setContainer(ref);
                    attributes.ref(ref);
                }}
            >
                {variable?.text}
                {element.fallback && ` or "${element.fallback}"`}
                {children}
            </span>
        </>
    );
}
