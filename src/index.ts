#!/usr/bin/env node
import { createProgram } from './cli.js';
import { startInteractiveMode } from './ui.js';
import { AdapterRegistry } from './utils/adapters.js';
import { GeminiAdapter } from './adapters/gemini.js';
import { ClaudeAdapter } from './adapters/claude.js';
import { CodexAdapter } from './adapters/codex.js';

// Register Adapters
AdapterRegistry.register(new GeminiAdapter());
AdapterRegistry.register(new ClaudeAdapter());
AdapterRegistry.register(new CodexAdapter());

if (process.argv.length === 2) {
  startInteractiveMode();
} else {
  const program = createProgram();
  program.parse(process.argv);
}