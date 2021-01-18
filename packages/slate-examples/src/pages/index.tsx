import { render } from '@prezly/slate-renderer';
import React from 'react';

import story from './story.json';
import styles from './index.module.scss';

const Index = () => {
    return <article className={styles.article}>{render(story.children)}</article>;
};

export default Index;
