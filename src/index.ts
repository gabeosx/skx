#!/usr/bin/env node
import { createProgram } from './cli.js';
import { startInteractiveMode } from './ui.js';

if (process.argv.length === 2) {
  startInteractiveMode();
} else {
  const program = createProgram();
  program.parse(process.argv);
}