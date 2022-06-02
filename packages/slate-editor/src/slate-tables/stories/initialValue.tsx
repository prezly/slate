/* eslint-disable react/jsx-key */
/** @jsx jsx */

import type { Descendant } from 'slate';

import { jsx } from './hyperscript';

export const initialValue = [
    <h-table border>
        <h-tr>
            <h-td colspan={2} rowspan={3}>
                <h-paragraph>1</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>e</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={2}>
                <h-paragraph>2</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>3</h-paragraph>
            </h-td>
        </h-tr>
        <h-tr>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>e</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>4</h-paragraph>
            </h-td>
        </h-tr>
        <h-tr>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>e</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>5</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>6</h-paragraph>
            </h-td>
        </h-tr>
        <h-tr>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>7</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>8</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>e</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>9</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>10</h-paragraph>
            </h-td>
        </h-tr>
    </h-table>,
    <h-paragraph>Second</h-paragraph>,
    <h-table border>
        <h-tr>
            <h-td colspan={2} rowspan={1}>
                <h-paragraph>&nbsp;</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={3}>
                <h-paragraph>2</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>3</h-paragraph>
            </h-td>
        </h-tr>
        <h-tr>
            <h-td colspan={2} rowspan={3}>
                <h-paragraph>1</h-paragraph>
            </h-td>
        </h-tr>
        <h-tr>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>4</h-paragraph>
            </h-td>
        </h-tr>
        <h-tr>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>5</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>6</h-paragraph>
            </h-td>
        </h-tr>
        <h-tr>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>7</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>8</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>9</h-paragraph>
            </h-td>
            <h-td colspan={1} rowspan={1}>
                <h-paragraph>10</h-paragraph>
            </h-td>
        </h-tr>
    </h-table>,
] as unknown as Descendant[];