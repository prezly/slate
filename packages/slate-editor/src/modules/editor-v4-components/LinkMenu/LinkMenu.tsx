import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { useRef } from 'react';
import { RootCloseWrapper } from 'react-overlays';

import { useEffectOnce } from '#lib';

import { Theme, useToolbarsTheme } from '#modules/themes';

import { Menu } from '../../../components';
import { Cross } from '../../../icons';

import { STRING_URL_PATTERN } from './constants';

import './LinkMenu.scss';

interface Props {
    canUnlink: boolean;
    onChange: (value: string) => void;
    onClose: () => void;
    onCreate: () => void;
    onRemove: () => void;
    value: string;
}

export const LinkMenu: FunctionComponent<Props> = ({
    canUnlink,
    onChange,
    onClose,
    onCreate,
    onRemove,
    value,
}) => {
    const theme = useToolbarsTheme();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffectOnce(() => {
        // This fixes an issue where input element is not autofocused on mount.
        // No, I have no idea why we need to call `select()`, or why this needs a `setTimeout`.
        // See: https://github.com/prezly/prezly/pull/8354#discussion_r476235647
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.select();
            }
        }, 0);
    });

    return (
        <RootCloseWrapper onRootClose={onClose}>
            <div
                className={classNames('editor-v4-link-menu', {
                    'editor-v4-link-menu--classic-theme': theme === Theme.CLASSIC,
                    'editor-v4-link-menu--dark-theme': theme === Theme.DARK,
                })}
            >
                <Menu.ButtonGroup>
                    <Menu.Button onClick={onClose}>
                        <Menu.Icon icon={Cross} />
                    </Menu.Button>
                </Menu.ButtonGroup>
                <form
                    className="editor-v4-link-menu__form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        onCreate();
                    }}
                >
                    <div className="editor-v4-link-menu__form-content">
                        <input
                            // `autoFocus` has to be `false` - otherwise page automatically scrolls
                            // to the top the moment `LinkMenu` is mounted (because underlying
                            // `ElementPortal` is initially rendered at the top and gets positioned
                            // correctly only at subsequent render with `useEffect`). We simulate
                            // the `autoFocus` behavior with `useEffectOnce` anyway
                            // (for a different reason though).
                            autoFocus={false}
                            className="editor-v4-link-menu__input"
                            name="link"
                            onChange={(event) => onChange(event.target.value)}
                            onMouseDown={(event) => {
                                // We want to stop propagation to avoid FloatingMenu.Toolbar capturing
                                // the onMouseDown event, which causes the click not to focus the input.
                                event.stopPropagation();
                            }}
                            pattern={STRING_URL_PATTERN}
                            placeholder="Enter your URL & press Enter"
                            ref={inputRef}
                            title="Please input a valid URL"
                            type="text"
                            value={value}
                        />
                    </div>
                    <Menu.ButtonGroup flex>
                        <Menu.Button variant="success" disabled={!value} type="submit">
                            Link
                        </Menu.Button>
                        <Menu.Button
                            variant="primary"
                            disabled={!canUnlink}
                            onClick={onRemove}
                            type="button"
                        >
                            Unlink
                        </Menu.Button>
                    </Menu.ButtonGroup>
                </form>
            </div>
        </RootCloseWrapper>
    );
};
