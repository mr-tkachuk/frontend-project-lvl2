import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers.js'

const getAbsolutePath = (filename) => {
    const currentDir = process.cwd();
    return path.resolve(currentDir, filename);
};

const readFile = (filename) => {
    const absolutePath = getAbsolutePath(filename);
    const extension = path.extname(filename);
    const parser = getParser(extension);
    const fileData = fs.readFileSync(absolutePath, 'utf-8');
    return parser(fileData);
};

const sortAllKeys = (...objects) => {
    const keys = objects.map(Object.keys);
    const allKeys = _.union(...keys);
    return _.sortBy(allKeys);
};

const getArrayOfDifferences = (obj1, obj2, sortedKeys) => sortedKeys.map((key) => {
    if (!obj1.hasOwnProperty(key)) {
        return `  + ${key}: ${obj2[key]}`;
    }
    if (!obj2.hasOwnProperty(key)) {
        return `  - ${key}: ${obj1[key]}`;
    }
    if (obj1[key] === obj2[key]) {
        return `    ${key}: ${obj1[key]}`;
    }
    return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`
});

const genDiff = (...paths) => {
    const filesData = paths.map(readFile);

    const allSortedKeys = sortAllKeys(...filesData);

    const result = getArrayOfDifferences(...filesData, allSortedKeys);

    return `{\n${result.join('\n')}\n}`;
};

export { genDiff };
