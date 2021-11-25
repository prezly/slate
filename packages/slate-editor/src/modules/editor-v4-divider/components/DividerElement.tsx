import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import * as React from 'react';
import type { RenderElementProps} from 'slate-react';
import { useSelected } from 'slate-react';

import './DividerElement.scss';

interface Props extends RenderElementProps {}

const DividerElement: FunctionComponent<Props> = ({ attributes, children, element }) => {
    const isSelected = useSelected();

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-divider-element', {
                'editor-v4-divider-element--active': isSelected,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            <div contentEditable={false}>
                <hr className="editor-v4-divider-element__line" />

                <div className="editor-v4-divider-element__hitbox" />
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};

export default DividerElement;
