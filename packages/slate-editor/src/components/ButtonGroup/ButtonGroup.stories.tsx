import * as React from 'react';

import { Button, ButtonGroup } from '#components';
import { Edit, Dice } from '#icons';

export default {
    title: 'Components/ButtonGroup',
};

export function Base() {
    return (
        <div style={{ width: 280, background: 'rgba(27, 27, 56, 0.96)', color: 'white' }}>
            <ButtonGroup>
                {[
                    <Button key="edit" variant="clear" icon={Edit} fullWidth>
                        Edit
                    </Button>,
                    <Button key="view" variant="clear" icon={Dice} fullWidth>
                        Randomize
                    </Button>,
                ]}
            </ButtonGroup>
        </div>
    );
}
