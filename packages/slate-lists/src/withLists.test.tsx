/** @jsx jsx */

import { Editor as Slate } from 'slate';

import {
    jsx,
    Editor,
    OrderedList,
    UnorderedList,
    ListItem,
    ListItemText,
    Text,
    Paragraph,
    Link,
    Untyped,
} from './jsx';
import type { ListsEditor } from './types';

describe('withLists', () => {
    describe('normalizeListChildren', () => {
        it('Converts paragraph into list-item when it is a child of a list', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text>lorem ipsum</Text>
                            </ListItemText>
                        </ListItem>
                        <Paragraph>
                            <Text>dolor</Text>
                        </Paragraph>
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
                                <Text>dolor</Text>
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });

        it('Wraps list in list-item when it is a child of a list', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text>lorem ipsum</Text>
                            </ListItemText>
                        </ListItem>
                        <UnorderedList>
                            <ListItem>
                                <ListItemText>
                                    <Text>lorem ipsum</Text>
                                </ListItemText>
                            </ListItem>
                        </UnorderedList>
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
                                        <Text>lorem ipsum</Text>
                                    </ListItemText>
                                </ListItem>
                            </UnorderedList>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });

    describe('normalizeListItemChildren', () => {
        it('Lifts up list-items when they are children of list-item', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text>lorem ipsum</Text>
                            </ListItemText>
                            <ListItem>
                                <ListItemText>
                                    <Text>dolor</Text>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Text>sit</Text>
                                </ListItemText>
                            </ListItem>
                        </ListItem>
                        <ListItem>
                            <Text>amet</Text>
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
                                <Text>dolor</Text>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Text>sit</Text>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Text>amet</Text>
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });

        it('Normalizes paragraph children of list items', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <Paragraph>
                                <Paragraph>
                                    <Text>lorem</Text>
                                </Paragraph>
                            </Paragraph>
                        </ListItem>
                        <ListItem>
                            <Paragraph>
                                <Text>ipsum</Text>
                            </Paragraph>
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
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Text>ipsum</Text>
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });

        it('Wraps extra list-item-text in list-item and lifts it up when it is a child of list-item', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text>lorem ipsum</Text>
                            </ListItemText>
                            <ListItemText>
                                <Text>dolor sit</Text>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <Text>amet</Text>
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
                                <Text>dolor sit</Text>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Text>amet</Text>
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });

        it('Wraps inline list-item children in list-item-text', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <Link href="https://example.com">
                                <Text>lorem ipsum</Text>
                            </Link>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            const expected = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text />
                                <Link href="https://example.com">
                                    <Text>lorem ipsum</Text>
                                </Link>
                                <Text />
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });

        it('Wraps inline list-item children and sibling texts in list-item-text', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <Text>lorem</Text>
                            <Link href="https://example.com">
                                <Text>ipsum</Text>
                            </Link>
                            <Text>dolor</Text>
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
                                <Link href="https://example.com">
                                    <Text>ipsum</Text>
                                </Link>
                                <Text>dolor</Text>
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });

        it('Adds missing type attribute to block list-item children', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <Untyped>
                                <Text>lorem ipsum</Text>
                            </Untyped>
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

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });

    describe('normalizeListItemTextChildren', () => {
        it('Unwraps block children of list-item-text elements', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Paragraph>
                                    <Text>lorem ipsum</Text>
                                </Paragraph>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Paragraph>
                                    <Paragraph>
                                        <Text>dolor sit amet</Text>
                                    </Paragraph>
                                </Paragraph>
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
                        <ListItem>
                            <ListItemText>
                                <Text>dolor sit amet</Text>
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });

    describe('normalizeOrphanListItem', () => {
        it('Converts orphan list-item into paragraph', () => {
            const editor = (
                <Editor>
                    <ListItem>
                        <ListItemText>
                            <Text>lorem ipsum</Text>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>dolor sit</Text>
                        </ListItemText>
                    </ListItem>
                </Editor>
            ) as unknown as ListsEditor;

            const expected = (
                <Editor>
                    <Paragraph>
                        <Text>lorem ipsum</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text>dolor sit</Text>
                    </Paragraph>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });

    describe('normalizeOrphanListItemText', () => {
        it('Converts orphan list-item-text into paragraph', () => {
            const editor = (
                <Editor>
                    <ListItemText>
                        <Text>lorem ipsum</Text>
                    </ListItemText>
                    <ListItemText>
                        <Text>dolor sit</Text>
                    </ListItemText>
                </Editor>
            ) as unknown as ListsEditor;

            const expected = (
                <Editor>
                    <Paragraph>
                        <Text>lorem ipsum</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text>dolor sit</Text>
                    </Paragraph>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });

    describe('normalizeOrphanNestedList', () => {
        it('Unwraps the nested list when it does not have sibling list-item-text', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <UnorderedList>
                                <ListItem>
                                    <ListItemText>
                                        <Text>lorem ipsum</Text>
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
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });

        it("Moves items from nested list to previous list-item's nested list when it does not have sibling list-item-text", () => {
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
                                        <Text>bbb</Text>
                                    </ListItemText>
                                </ListItem>
                            </UnorderedList>
                        </ListItem>
                        <ListItem>
                            <OrderedList>
                                <ListItem>
                                    <ListItemText>
                                        <Text>lorem ipsum</Text>
                                    </ListItemText>
                                </ListItem>
                            </OrderedList>
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
                                <ListItem>
                                    <ListItemText>
                                        <Text>bbb</Text>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Text>lorem ipsum</Text>
                                    </ListItemText>
                                </ListItem>
                            </UnorderedList>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });

        it('Moves nested list to previous list item when it does not have sibling list-item-text', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text>lorem ipsum</Text>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <OrderedList>
                                <ListItem>
                                    <ListItemText>
                                        <Text>lorem ipsum</Text>
                                    </ListItemText>
                                </ListItem>
                            </OrderedList>
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
                            <OrderedList>
                                <ListItem>
                                    <ListItemText>
                                        <Text>lorem ipsum</Text>
                                    </ListItemText>
                                </ListItem>
                            </OrderedList>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });

    describe('normalizeSiblingLists', () => {
        it('Merges sibling lists of same type', () => {
            const editor = (
                <Editor>
                    <Paragraph>
                        <Text>lorem</Text>
                    </Paragraph>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text>ipsum</Text>
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text />
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            const expected = (
                <Editor>
                    <Paragraph>
                        <Text>lorem</Text>
                    </Paragraph>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text>ipsum</Text>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <Text />
                            </ListItemText>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });

        it('Merges sibling lists of different types when they are nested lists', () => {
            const editor = (
                <Editor>
                    <UnorderedList>
                        <ListItem>
                            <ListItemText>
                                <Text>lorem</Text>
                            </ListItemText>
                            <OrderedList>
                                <ListItem>
                                    <ListItemText>
                                        <Text>ipsum</Text>
                                    </ListItemText>
                                </ListItem>
                            </OrderedList>
                            <UnorderedList>
                                <ListItem>
                                    <ListItemText>
                                        <Text>dolor</Text>
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
                            <OrderedList>
                                <ListItem>
                                    <ListItemText>
                                        <Text>ipsum</Text>
                                    </ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        <Text>dolor</Text>
                                    </ListItemText>
                                </ListItem>
                            </OrderedList>
                        </ListItem>
                    </UnorderedList>
                </Editor>
            ) as unknown as ListsEditor;

            Slate.normalize(editor, { force: true });

            expect(editor.children).toEqual(expected.children);
        });
    });
});
