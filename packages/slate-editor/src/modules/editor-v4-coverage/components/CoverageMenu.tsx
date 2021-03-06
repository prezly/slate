import React, { FunctionComponent, RefObject } from 'react';
import { useSelected, useSlate } from 'slate-react';

import { FloatingMenu } from '../../../components';
import { Trash } from '../../../icons';
import { EventsEditor } from '../../../modules/editor-v4-events';
import { removeCoverage } from '../lib';

interface Props {
    containerRef: RefObject<HTMLElement>;
    element: HTMLElement;
}

const CoverageMenu: FunctionComponent<Props> = ({ element, containerRef }) => {
    const editor = useSlate();
    const isSelected = useSelected();

    if (!isSelected) {
        return null;
    }

    const handleRemove = () => {
        const removedElement = removeCoverage(editor);

        if (removedElement) {
            EventsEditor.dispatchEvent(editor, 'coverage-removed');
        }
    };

    return (
        <FloatingMenu containerRef={containerRef} element={element}>
            <FloatingMenu.ButtonGroup>
                <FloatingMenu.Button
                    onMouseDown={handleRemove}
                    title="Delete coverage"
                    variant="danger"
                >
                    <FloatingMenu.Icon icon={Trash} />
                </FloatingMenu.Button>
            </FloatingMenu.ButtonGroup>
        </FloatingMenu>
    );
};

export default CoverageMenu;
