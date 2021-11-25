import type { FunctionComponent, RefObject } from 'react';
import * as React from 'react';
import { useSelected, useSlate } from 'slate-react';

import { FloatingMenu } from '../../../components';
import { Trash } from '../../../icons';
import { removeDivider } from '../transforms';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
}

const DividerMenu: FunctionComponent<Props> = ({ element, containerRef }) => {
    const editor = useSlate();
    const isSelected = useSelected();

    if (!isSelected) {
        return null;
    }

    return (
        <FloatingMenu containerRef={containerRef} element={element}>
            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button
                    onMouseDown={() => removeDivider(editor)}
                    title="Delete divider"
                    variant="danger"
                >
                    <FloatingMenu.Icon icon={Trash} />
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>
        </FloatingMenu>
    );
};

export default DividerMenu;
