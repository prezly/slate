import type { VariableNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected, useSlateStatic } from 'slate-react';

import { Button, Input, Menu as BaseMenu, Toolbox, VStack } from '#components';
import { Delete } from '#icons';

import { Menu } from '../../components/EditorBlock';

import { removeVariable, updateVariable } from './transforms';
import type { Variable } from './types';
import styles from './VariableElement.module.scss';

interface Props extends RenderElementProps {
    element: VariableNode;
    variables: Variable[];
}

export function VariableElement({ attributes, children, element, variables }: Props) {
    const selected = useSelected();
    const editor = useSlateStatic();

    const [isMenuOpen, setMenuOpen] = useState(false);
    const [fallback, setFallback] = useState<string>(element.fallback ?? '');
    const [container, setContainer] = useState<HTMLSpanElement | null>(null);

    const options = variables.map((variable) => ({
        value: variable.key,
        label: variable.text,
        withFallback: variable.withFallback,
    }));
    const option = options.find(({ value }) => value === element.key);

    function handleCloseMenu() {
        setMenuOpen(false);
    }

    function handleChangeType(newType: string) {
        updateVariable(editor, { key: newType });
    }

    function handleSave() {
        updateVariable(editor, { fallback: fallback !== '' ? fallback : null });
        handleCloseMenu();
    }

    function handleRemove() {
        removeVariable(editor);
    }

    useEffect(() => {
        if (selected) {
            setMenuOpen(true);
            setFallback(element.fallback ?? '');
        }
    }, [selected]);

    useEffect(() => {
        if (!option?.withFallback) {
            updateVariable(editor, { fallback: null });
        }
    }, [option?.withFallback]);

    return (
        <>
            {selected && container && isMenuOpen && (
                <Menu
                    popperOptions={{ modifiers: { arrow: { padding: 0 } } }}
                    reference={container}
                >
                    <Toolbox.Header onCloseClick={handleCloseMenu} withCloseButton>
                        Variable settings
                    </Toolbox.Header>
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
                    {option?.withFallback && (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleSave();
                            }}
                        >
                            <Toolbox.Section>
                                <VStack spacing="2">
                                    <Toolbox.Caption>Fallback</Toolbox.Caption>
                                    <Input
                                        name="fallback"
                                        value={fallback}
                                        onChange={setFallback}
                                        placeholder="Define your fallback"
                                    />
                                    <Button
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
                {option?.label}
                {element.fallback && ` or "${element.fallback}"`}
                {children}
            </span>
        </>
    );
}
