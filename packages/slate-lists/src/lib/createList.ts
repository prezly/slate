import { Element } from 'slate';

const createList = (type: string, children: Element[] = []): Element => ({
    children,
    type,
});

export default createList;
