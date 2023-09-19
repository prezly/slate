import { EditorCommands, useRegisterExtension } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import React, { useCallback, useState } from 'react';
import { useSlateStatic } from 'slate-react';

import { EventsEditor } from '#modules/events';

import type { Props as FoatingAddMenuProps } from './FloatingAddMenu';
import { FloatingAddMenu } from './FloatingAddMenu';
import { isMenuHotkey, MENU_TRIGGER_CHARACTER, shouldShowMenuButton } from './lib';

const isTriggerHotkey = isHotkey(`shift?+${MENU_TRIGGER_CHARACTER}`, { byKey: true });

export const EXTENSION_ID = 'FloatingAddMenuExtension';

export type Parameters<Action> = Omit<FoatingAddMenuProps<Action>, 'open' | 'onToggle'>;

export function FloatingAddMenuExtension<Action>({
    tooltip,
    availableWidth,
    containerRef,
    options,
    onActivate,
    onFilter,
}: Parameters<Action>) {
    const editor = useSlateStatic();
    const [isFloatingAddMenuOpen, setFloatingAddMenuOpen] = useState(false);

    const onFloatingAddMenuToggle = useCallback(
        function (shouldOpen: boolean, trigger: 'click' | 'hotkey' | 'input') {
            setFloatingAddMenuOpen(shouldOpen);
            if (shouldOpen) {
                EventsEditor.dispatchEvent(editor, 'add-button-menu-opened', { trigger });
            } else {
                EventsEditor.dispatchEvent(editor, 'add-button-menu-closed');
            }
        },
        [setFloatingAddMenuOpen],
    );

    useRegisterExtension({
        id: EXTENSION_ID,
        onKeyDown(event, editor) {
            if (isMenuHotkey(event) && shouldShowMenuButton(editor)) {
                onFloatingAddMenuToggle(true, 'hotkey');
                return true;
            }

            if (isTriggerHotkey(event) && shouldShowMenuButton(editor)) {
                onFloatingAddMenuToggle(true, 'input');
                return false; // returning false intentionally
            }
            return false;
        },
    });

    return (
        <FloatingAddMenu
            tooltip={tooltip}
            open={isFloatingAddMenuOpen}
            availableWidth={availableWidth}
            containerRef={containerRef}
            onActivate={onActivate}
            onFilter={onFilter}
            onToggle={(toggle) => onFloatingAddMenuToggle(toggle, 'click')}
            options={options}
            showTooltipByDefault={EditorCommands.isEmpty(editor)}
        />
    );
}
