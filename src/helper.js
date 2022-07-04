import { program } from 'commander';

// const helper = program
// .name('gendiff')
// .description('Compares two configuration files and shows a difference.')
// .version('1.0.0');

// helper.parse();
// export default helper;

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');
// .option('--first')
// .option('-s, --separator <char>');

export default program;

// const options = program.opts();
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));
