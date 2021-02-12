import { SPACE } from './constants';

const generateSpaces = (count: number): string =>
    Array.from({ length: count }, () => SPACE).join('');

export default generateSpaces;
