#! /usr/bin/env node

import { Command } from 'commander';
import genDiff from './main.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(genDiff);

program.parse(process.argv);
