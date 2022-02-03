import * as React from 'react';

import { Flex } from '#components';

export default {
    title: 'Components/Flex',
    component: Flex,
};

export function Playground() {
    return (
        <Flex>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </Flex>
    );
}
