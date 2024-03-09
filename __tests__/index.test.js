import { genDiff } from '../src/index.js';
import fs from 'fs';

let result;

beforeAll(() => {
    result  = fs.readFileSync('./__fixtures__/testResult.txt', 'utf-8');
});

test('flat json', () => {
    const jsonPath1 = './__fixtures__/a.json';
    const jsonPath2 = './__fixtures__/b.json';
    const actual = genDiff(jsonPath1, jsonPath2);
    const expected = result.trim();
    expect(actual).toMatch(expected);
});

test('flat yaml', () => {
    const yamlPath1 = './__fixtures__/a.yml';
    const yamlPath2 = './__fixtures__/b.yml';
    const actual = genDiff(yamlPath1, yamlPath2);
    const expected = result.trim();
    expect(actual).toMatch(expected);
});
