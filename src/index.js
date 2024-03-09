import _ from 'lodash';
import { readFile } from './parsers.js'
import doFormat from './formatter/index.js'

const diff = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const sortKeys = keys1.concat(keys2).sort();
    const uniqKeys = _.uniq(sortKeys);

    return uniqKeys.map((key) => {
        if (_.has(obj1, key) && !_.has(obj2, key)) {
            return { key, value: obj1[key], status: 'removed' };
        }
        if (!_.has(obj1, key) && _.has(obj2, key)) {
            return { key, value: obj2[key], status: 'added' };
        }
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
            return { key, value: diff(obj1[key], obj2[key]), status: 'nested' };
        }
        if (obj1[key] !== obj2[key]) {
            return { key, oldValue: obj1[key], newValue: obj2[key], status: 'changed', };
        }
        return { key, value: obj1[key], status: 'unchanged' };
    });
}

const genDiff = (file1, file2, formatter = 'stylish') => {
    const filesData = [file1, file2].map(readFile);

    const tree = diff(...filesData);

    return doFormat(formatter, tree)
};

export default genDiff;
