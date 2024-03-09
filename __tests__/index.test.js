import fs from 'fs';
import genDiff from '../src/index.js';

test('deep json', () => {
  const result = fs.readFileSync('./__fixtures__/jsonDeep.txt', 'utf-8');
  const jsonPath1 = './__fixtures__/a.json';
  const jsonPath2 = './__fixtures__/b.json';
  const actual = genDiff(jsonPath1, jsonPath2, 'stylish');
  const expected = result.trim();
  expect(actual).toMatch(expected);
});

test('flat yaml', () => {
  const result = fs.readFileSync('./__fixtures__/yamlFlat.txt', 'utf-8');
  const yamlPath1 = './__fixtures__/a.yml';
  const yamlPath2 = './__fixtures__/b.yml';
  const actual = genDiff(yamlPath1, yamlPath2, 'stylish');
  const expected = result.trim();
  expect(actual).toMatch(expected);
});
