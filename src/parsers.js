import yaml from 'js-yaml';
import path from 'path'
import fs from 'fs'

const getAbsolutePath = (filename) => {
    const currentDir = process.cwd();
    return path.resolve(currentDir, filename);
};

const chooseParser = (extension) => {
    if (extension === '.json')  return JSON.parse;
    if (extension === '.yml' || extension === '.yaml') return yaml.load;
};

export const readFile = (filename) => {
    const absolutePath = getAbsolutePath(filename);
    const extension = path.extname(filename);
    const parser = chooseParser(extension);
    const fileData = fs.readFileSync(absolutePath, 'utf-8');
    return parser(fileData);
};
