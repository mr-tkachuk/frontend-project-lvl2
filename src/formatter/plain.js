import _ from 'lodash';

function outputValue(value) {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
}

const plain = (tree) => {
  const iter = (node, path) => {
    // eslint-disable-next-line array-callback-return,consistent-return
    const result = node.flatMap((obj) => {
      const { key, value, status } = obj;
      const valuePath = [...path, key].join('.');

      switch (status) {
        case 'nested':
          return iter(value, [valuePath]);
        case 'added':
          return `Property '${valuePath}' was added with value: ${outputValue(value)}`;
        case 'removed':
          return `Property '${valuePath}' was removed`;
        case 'changed':
          return `Property '${valuePath}' was updated. From ${outputValue(obj.oldValue)} to ${outputValue(obj.newValue)}`;
        case 'unchanged':
          return [];
        default:
          console.error(`Status "${status}" is unknown`);
      }
    });

    return result.join('\n');
  };

  return iter(tree, []);
};

export default plain;
