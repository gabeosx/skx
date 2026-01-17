import { describe, it, expect, vi } from 'vitest';
import { createProgram } from '../src/cli.js';
import { Command } from 'commander';

describe('CLI', () => {
  it('should create a program with the correct name and version', () => {
    const program = createProgram();
    expect(program.name()).toBe('skx');
    // Version is usually set from package.json, but here we check if it's set
    expect(program.version()).toBeDefined();
  });

  it('should have a search command', () => {
    const program = createProgram();
    const searchCmd = program.commands.find((cmd) => cmd.name() === 'search');
    expect(searchCmd).toBeDefined();
    expect(searchCmd?.description()).toBeDefined();
  });
});
