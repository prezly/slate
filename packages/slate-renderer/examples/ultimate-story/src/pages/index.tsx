import { render } from '@prezly/slate-renderer';
import React from 'react';

import story from './story.json';

const Index = () => {
    return <article style={{ margin: '0 auto', width: 640 }}>{render(story.children)}</article>;
};

export default Index;
