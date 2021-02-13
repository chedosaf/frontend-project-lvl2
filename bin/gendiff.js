#! /usr/bin/env node

import { Command } from 'commander';
import genDiff from './main.js';
import formateStylish from '../formatters/stylish.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    let diff = '';
    if (options.format === 'stylish') {
      diff = genDiff(filepath1, filepath2, formateStylish);
    }
    console.log(diff);
  });

program.parse(process.argv);

// const options = program.opts();
