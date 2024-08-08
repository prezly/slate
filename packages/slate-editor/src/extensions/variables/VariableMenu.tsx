import type { VariableNode } from '@prezly/slate-types';
import React, { useState } from 'react';
import { useSlateStatic } from 'slate-react';

import { Button, Input, Menu as BaseMenu, Toolbox, VStack, TooltipV2 } from '#components';
import { Delete, Info } from '#icons';

import { usePopperOptionsContext } from '#modules/popper-options-context';

import { Menu } from '../../components/EditorBlock';

import { removeVariable, updateVariable } from './transforms';
import type { Variable } from './types';
import styles from './VariableMenu.module.scss';

interface Props {
    container: HTMLElement;
    element: VariableNode;
    onClose: () => void;
    variables: Variable[];
}

export function VariableMenu({ container, element, onClose, variables }: Props) {
    const editor = useSlateStatic();
    const popperOptions = usePopperOptionsContext();

    const [fallback, setFallback] = useState<string>(element.fallback ?? '');
    const disabled = fallback === (element.fallback ?? '');

    const options = variables.map((variable) => ({
        value: variable.key,
        label: variable.text,
        withFallback: variable.withFallback,
    }));
    const option = options.find(({ value }) => value === element.key);

    function handleChangeType(newType: string) {
        const newOption = options.find(({ value }) => value === newType);
        if (newOption && !newOption.withFallback) {
            updateVariable(editor, { fallback: '' });
        } else {
            updateVariable(editor, { key: newType });
        }
    }

    function handleSave() {
        updateVariable(editor, { fallback });
    }

    function handleRemove() {
        removeVariable(editor);
    }

    return (
        <Menu
            popperOptions={{ ...popperOptions, modifiers: { arrow: { padding: 0 } } }}
            reference={container}
        >
            <Toolbox.Header onCloseClick={onClose} withCloseButton>
                Variable settings
            </Toolbox.Header>
            {options.length > 1 && (
                <Toolbox.Section>
                    <VStack spacing="2">
                        <Toolbox.Caption>Type</Toolbox.Caption>
                        <BaseMenu.Dropdown
                            className={styles.Dropdown}
                            onChange={handleChangeType}
                            options={options}
                            value={element.key}
                            variant="light"
                        />
                    </VStack>
                </Toolbox.Section>
            )}
            {option?.withFallback && (
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSave();
                    }}
                >
                    <Toolbox.Section>
                        <VStack spacing="2">
                            <Toolbox.Caption className={styles.Caption}>
                                Fallback
                                <TooltipV2.Tooltip
                                    tooltip={`This text will be used if '${option.label}' is not available.`}
                                >
                                    {({ ariaAttributes, onHide, onShow, setReferenceElement }) => (
                                        <span
                                            {...ariaAttributes}
                                            ref={setReferenceElement}
                                            onFocus={onShow}
                                            onBlur={onHide}
                                            onMouseEnter={onShow}
                                            onMouseLeave={onHide}
                                            className={styles.Icon}
                                        >
                                            <Info />
                                        </span>
                                    )}
                                </TooltipV2.Tooltip>
                            </Toolbox.Caption>
                            <Input
                                name="fallback"
                                value={fallback}
                                onChange={setFallback}
                                placeholder="Define your fallback"
                            />
                            <Button
                                disabled={disabled}
                                variant="primary"
                                type="submit"
                                size="small"
                                fullWidth
                                round
                            >
                                Save
                            </Button>
                        </VStack>
                    </Toolbox.Section>
                </form>
            )}
            <Toolbox.Footer>
                <Button variant="clear" icon={Delete} fullWidth onClick={handleRemove}>
                    Remove
                </Button>
            </Toolbox.Footer>
        </Menu>
    );
}
