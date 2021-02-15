#!/usr/bin/env node

import { Command } from 'commander';
// import genDiff from './main.js';
// import formateStylish from '../formatters/stylish.js';
// import formatePlain from '../formatters/plain.js';
// import formateJson from '../formatters/json.js';
import format from '../formatters/index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = format[options.format](filepath1, filepath2);
    console.log(diff);
  });

program.parse(process.argv);
