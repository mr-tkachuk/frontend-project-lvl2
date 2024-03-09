import yaml from 'js-yaml';
export default (extension) => {
    if (extension === '.json')  return JSON.parse;
    if (extension === '.yml' || extension === '.yaml') return yaml.load;
};
