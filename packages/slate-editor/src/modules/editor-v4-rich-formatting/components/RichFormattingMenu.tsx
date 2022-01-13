import { EditorCommands } from '@prezly/slate-commons';
import type { Alignment } from '@prezly/slate-types';
import type { FunctionComponent, RefObject } from 'react';
import React, { useState } from 'react';
import type { Modifier } from 'react-popper';
import type { Path, Range } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor, useSlate } from 'slate-react';
import { v4 as uuidV4 } from 'uuid';

import { ElementPortalV2, Menu, TextSelectionPortalV2 } from '#components';

import { LinkMenu } from '#modules/editor-v4-components';

import {
    findLinkCandidatePath,
    findSelectedLinkPath,
    getCurrentHref,
    getRichFormattingBlockNodeType,
    isSelectionSupported,
    keepToolbarInTextColumn,
    restoreSelection,
    unwrapLink,
    unwrapLinkCandidates,
    updateLinkHref,
    useLinkCandidateElement,
    wrapInLink,
    wrapInLinkCandidate,
} from '../lib';
import type { RichFormattingExtensionParameters } from '../types';
import { ElementType } from '../types';

import { RichFormattingToolbar } from './RichFormattingToolbar';

interface Props {
    alignmentControls: boolean;
    availableWidth: number;
    containerRef: RefObject<HTMLElement>;
    defaultAlignment: Alignment;
    parameters: RichFormattingExtensionParameters;
}

const OFFSET_MODIFIER: Modifier<'offset'> = {
    name: 'offset',
    options: {
        offset: [-12, 4],
    },
};

export const RichFormattingMenu: FunctionComponent<Props> = ({
    alignmentControls,
    availableWidth,
    containerRef,
    defaultAlignment,
    parameters,
}) => {
    const editor = useSlate();

    if (!HistoryEditor.isHistoryEditor(editor)) {
        throw new Error('RichFormattingMenu requires HistoryEditor to work');
    }

    const show = isSelectionSupported(editor);
    const activeNodeType = getRichFormattingBlockNodeType(editor);
    const [href, setHref] = useState<string>('');
    const [isExistingLink, setIsExistingLink] = useState<boolean>(false);
    const [linkCandidateId, setLinkCandidateId] = useState<string | null>(null);
    const [linkPath, setLinkPath] = useState<Path | null>(null);
    const [savedSelection, setSavedSelection] = useState<Path | Range | null>(null);
    const linkCandidateElement = useLinkCandidateElement(linkCandidateId);

    function resetState() {
        setHref('');
        setIsExistingLink(false);
        setLinkCandidateId(null);
        setLinkPath(null);
        setSavedSelection(null);
    }

    function handleRemoveLinkCandidate() {
        if (!savedSelection) {
            return;
        }

        HistoryEditor.withoutSaving(editor, () => {
            unwrapLinkCandidates(editor);
        });

        restoreSelection(editor, savedSelection);
        resetState();
    }

    function handleAddLinkCandidate(selection: Path | Range) {
        const id = uuidV4();
        setSavedSelection(selection);

        HistoryEditor.withoutSaving(editor, () => {
            wrapInLinkCandidate(editor, selection, id);
        });

        setLinkPath(findLinkCandidatePath(editor, id));
        setLinkCandidateId(id);
    }

    function handleRemoveLink() {
        if (!linkPath) {
            return;
        }

        handleRemoveLinkCandidate();
        unwrapLink(editor, linkPath);
    }

    function handleCreateLink() {
        if (!savedSelection || !linkPath) {
            return;
        }

        if (!href) {
            return;
        }

        const isEditingExistingLink = EditorCommands.isBlockActive(
            editor,
            ElementType.LINK,
            linkPath,
        );

        HistoryEditor.withoutSaving(editor, () => {
            unwrapLinkCandidates(editor);
        });

        restoreSelection(editor, savedSelection);

        if (isEditingExistingLink) {
            updateLinkHref(editor, linkPath, href);
        } else {
            wrapInLink(editor, savedSelection, href);
        }

        resetState();
    }

    function handleLinkButtonClick() {
        const selection = findSelectedLinkPath(editor) || editor.selection;

        if (!selection) {
            return;
        }

        const currentHref = getCurrentHref(editor, selection) || '';
        setHref(currentHref);
        // We have to store the value as a state because we deliberately blur the editor
        // later in this code, which loses the selection, therefore `isBlockActive` does
        // not work as expected.
        setIsExistingLink(currentHref !== '');

        handleAddLinkCandidate(selection);

        // We have to blur the editor to allow the LinkMenu input focus.
        ReactEditor.blur(editor);
    }

    if (parameters.links && linkCandidateElement) {
        return (
            <ElementPortalV2
                containerRef={containerRef}
                element={linkCandidateElement}
                modifiers={[OFFSET_MODIFIER]}
                placement="top"
            >
                <Menu.Toolbar>
                    <LinkMenu
                        canUnlink={isExistingLink}
                        onChange={setHref}
                        onClose={handleRemoveLinkCandidate}
                        onCreate={handleCreateLink}
                        onRemove={handleRemoveLink}
                        value={href}
                    />
                </Menu.Toolbar>
            </ElementPortalV2>
        );
    }

    if (!show) {
        return null;
    }

    return (
        <TextSelectionPortalV2
            containerRef={containerRef}
            modifiers={[
                OFFSET_MODIFIER,
                keepToolbarInTextColumn({
                    editorElement: containerRef.current,
                    availableWidth,
                }),
            ]}
            placement="top-start"
        >
            <Menu.Toolbar className="rich-formatting-menu">
                <RichFormattingToolbar
                    activeNodeType={activeNodeType}
                    alignmentControls={alignmentControls}
                    defaultAlignment={defaultAlignment}
                    onLinkClick={handleLinkButtonClick}
                    parameters={parameters}
                />
            </Menu.Toolbar>
        </TextSelectionPortalV2>
    );
};
