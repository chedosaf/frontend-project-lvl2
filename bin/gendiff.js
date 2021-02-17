#!/usr/bin/env node

import pkg from 'commander';
import gendiff from './main.js';

const { Command } = pkg;

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const diff = gendiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

program.parse(process.argv);
