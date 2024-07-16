import React from 'react';

import { Button, Toolbox } from '#components';
import { Delete, Edit } from '#icons';

interface Props {
    onClose: () => void;
    onEdit: () => void;
    onRemove: () => void;
}

export function InlineContactMenu({ onClose, onEdit, onRemove }: Props) {
    return (
        <>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Contact settings
            </Toolbox.Header>

            <Toolbox.Section noPadding>
                <EditButton onClick={onEdit} />
            </Toolbox.Section>

            <Toolbox.Footer>
                <RemoveButton onClick={onRemove} />
            </Toolbox.Footer>
        </>
    );
}

function EditButton(props: { onClick: () => void }) {
    return (
        <Button variant="clear" icon={Edit} fullWidth onClick={props.onClick}>
            Edit
        </Button>
    );
}

function RemoveButton(props: { onClick: () => void }) {
    return (
        <Button variant="clear" icon={Delete} fullWidth onClick={props.onClick}>
            Remove
        </Button>
    );
}
