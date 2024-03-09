import stylish from './stylish.js';
import plain from './plain.js';

// eslint-disable-next-line consistent-return
const doFormat = (formatterName, tree) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(tree, '  ');
    case 'plain':
      return plain(tree, '  ');
    case 'json':
      return JSON.stringify(tree);
    default:
      console.error(`Unknown formatter: "${formatterName}"`);
  }
};

export default doFormat;
