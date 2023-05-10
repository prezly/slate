/** @jsx hyperscript */

import {
    hyperscript,
    Editor,
    OrderedList,
    UnorderedList,
    ListItem,
    ListItemText,
    Text,
    Anchor,
    Focus,
} from '../hyperscript';
import type { ListsEditor } from '../types';

import { getListItemsInRange } from './getListItemsInRange';

describe('getListItemsInRange', () => {
    it('Returns an empty array when there is no selection', () => {
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
                        </UnorderedList>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Text>Nested Lists C</Text>
                        </ListItemText>
                    </ListItem>
                </UnorderedList>
            </Editor>
        ) as unknown as ListsEditor;

        const listItemsInRange = getListItemsInRange(editor, editor.selection);
        expect(listItemsInRange).toEqual([]);
    });

    it('Finds all partially selected list items', () => {
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

        const listItemsInRange = getListItemsInRange(editor, editor.selection);
        const listItemsPathsInRange = listItemsInRange.map(([, path]) => path);

        expect(listItemsPathsInRange).toEqual([
            [0, 0, 1, 1],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1],
            [0, 0, 1, 2],
            [0, 1],
            [0, 1, 1, 0],
            [0, 1, 1, 0, 1, 0],
            [0, 1, 1, 0, 1, 1],
        ]);
    });
});
