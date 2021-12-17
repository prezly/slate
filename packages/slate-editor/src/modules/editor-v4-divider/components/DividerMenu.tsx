import type { FunctionComponent, RefObject } from 'react';
import React from 'react';
import { useSelected, useSlate } from 'slate-react';

import { FloatingMenu, Menu } from '../../../components';
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
            <Menu.ButtonGroup>
                <Menu.Button
                    onMouseDown={() => removeDivider(editor)}
                    title="Delete divider"
                    variant="danger"
                >
                    <Menu.Icon icon={Trash} />
                </Menu.Button>
            </Menu.ButtonGroup>
        </FloatingMenu>
    );
};

export default DividerMenu;
