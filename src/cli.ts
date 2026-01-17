import { Command } from 'commander';

export function createProgram(): Command {
  const program = new Command();

  program
    .name('skx')
    .description('A CLI tool to discover skills')
    .version('1.0.0');

  program
    .command('search')
    .description('Search for skills')
    .argument('[query]', 'Search query')
    .action((query) => {
      console.log(`Searching for: ${query || 'all'}`);
    });

  return program;
}
