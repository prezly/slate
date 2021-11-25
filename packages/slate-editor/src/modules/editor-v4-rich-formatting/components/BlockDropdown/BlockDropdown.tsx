import type { FunctionComponent } from 'react';
import React from 'react';

import { FloatingMenu } from '../../../../components';
import type { BlockType } from '../../types';

import OPTIONS from './options';

interface Props {
    onChange: (value: BlockType) => void;
    value: BlockType | null;
}

const BlockDropdown: FunctionComponent<Props> = ({ value, onChange }) => (
    <FloatingMenu.Dropdown<BlockType>
        id="prezly-editor-toolbar-dropdown"
        onChange={onChange}
        options={OPTIONS}
        richTextFormattingOptions
        value={value || undefined}
    />
);
export default BlockDropdown;
