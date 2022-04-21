/** @jsx jsx */

import {
    jsx,
    Editor,
    OrderedList,
    UnorderedList,
    ListItem,
    ListItemText,
    Text,
    Paragraph,
    Cursor,
    Anchor,
    Focus,
} from '../jsx';
import type { ListsEditor } from '../types';

import { decreaseDepth } from './decreaseDepth';

describe('decreaseDepth - no selected items', () => {
    it('Does nothing when there is no selection', () => {
        const editor = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem ipsum</Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        const expected = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem ipsum</Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('decreaseDepth - single item selected', () => {
    it('Converts list item to a paragraph when there is no grandparent list', () => {
        const editor = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>
                                lorem ipsum
                                <Cursor />
                            </Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        const expected = (
            <Editor>
                <Paragraph>
                    <Text>
                        lorem ipsum
                        <Cursor />
                    </Text>
                </Paragraph>
            </Editor>
        ) as unknown as ListsEditor;

        decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves list-item to the grandparent list', () => {
        const editor = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>ipsum</Text>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>
                                        dolor sit amet
                                        <Cursor />
                                    </Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        const expected = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>ipsum</Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>
                                dolor sit amet
                                <Cursor />
                            </Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves list-item to the grandparent list and removes the parent list if empty', () => {
        const editor = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem ipsum</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>
                                        dolor sit amet
                                        <Cursor />
                                    </Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        const expected = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem ipsum</Text>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>
                                dolor sit amet
                                <Cursor />
                            </Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Moves list-item to the grandparent list and moves succeeding siblings into a new nested list', () => {
        const editor = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem ipsum</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>aaa</Text>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>
                                        dolor sit amet
                                        <Cursor />
                                    </Text>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>bbb</Text>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>ccc</Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        const expected = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem ipsum</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>aaa</Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>
                                dolor sit amet
                                <Cursor />
                            </Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>bbb</Text>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>ccc</Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Converts list-item into a paragraph, moves it out of the list and moves succeeding siblings into a new list', () => {
        const editor = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem ipsum</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>aaa</Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>
                                dolor sit amet
                                <Cursor />
                            </Text>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>bbb</Text>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>ccc</Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        const expected = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem ipsum</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>aaa</Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                </UnorderedList>
                <Paragraph>
                    <Text>
                        dolor sit amet
                        <Cursor />
                    </Text>
                </Paragraph>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>bbb</Text>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>ccc</Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

describe('decreaseDepth - multiple items selected', () => {
    it('Decreases depth of all list items in selection that have no list items ancesors in selection', () => {
        const editor = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>Nested Lists A</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>Nested Lists A1</Text>
                                </ListItemText>
                                <OrderedList>
                                    <ListItem>
                                        <ListItemText>
                                            <Text>Nested Lists A1a</Text>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Text>Nested Lists A1b</Text>
                                        </ListItemText>
                                    </ListItem>
                                </OrderedList>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>
                                        Nested
                                        <Anchor /> Lists A2
                                    </Text>
                                </ListItemText>
                                <UnorderedList>
                                    <ListItem>
                                        <ListItemText>
                                            <Text>Nested Lists A2a</Text>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Text>Nested Lists A2b</Text>
                                        </ListItemText>
                                    </ListItem>
                                </UnorderedList>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>Nested Lists A3</Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>Nested Lists B</Text>
                        </ListItemText>
                        <OrderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>Nested Lists B1</Text>
                                </ListItemText>
                                <UnorderedList>
                                    <ListItem>
                                        <ListItemText>
                                            <Text>Nested Lists B1a</Text>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Text>
                                                Nested Lists
                                                <Focus /> B1b
                                            </Text>
                                        </ListItemText>
                                    </ListItem>
                                </UnorderedList>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>Nested Lists B2</Text>
                                </ListItemText>
                            </ListItem>
                        </OrderedList>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>Nested Lists C</Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        const expected = (
            <Editor>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>Nested Lists A</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>Nested Lists A1</Text>
                                </ListItemText>
                                <OrderedList>
                                    <ListItem>
                                        <ListItemText>
                                            <Text>Nested Lists A1a</Text>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Text>Nested Lists A1b</Text>
                                        </ListItemText>
                                    </ListItem>
                                </OrderedList>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>
                                Nested
                                <Anchor /> Lists A2
                            </Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>Nested Lists A2a</Text>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>Nested Lists A2b</Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>Nested Lists A3</Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
                <Paragraph>
                    <Text>Nested Lists B</Text>
                </Paragraph>
                <UnorderedList>
                    <ListItem>
                        <ListItemText>
                            <Text>Nested Lists B1</Text>
                        </ListItemText>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>Nested Lists B1a</Text>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>
                                        Nested Lists
                                        <Focus /> B1b
                                    </Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>Nested Lists B2</Text>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>Nested Lists C</Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        decreaseDepth(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
