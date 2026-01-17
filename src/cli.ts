import { Command } from 'commander';
import chalk from 'chalk';
import { fetchRegistry } from './utils/registry.js';
import { searchSkills } from './utils/search.js';

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
    .action(async (query) => {
      try {
        const skills = await fetchRegistry();
        const results = searchSkills(skills, query || '');

        if (results.length === 0) {
          console.log(chalk.yellow('No skills found.'));
          return;
        }

        console.log(chalk.green(`Found ${results.length} skills:`));
        results.forEach((skill) => {
          console.log(chalk.bold(skill.name));
          console.log(`  ${skill.description}`);
          console.log(chalk.dim(`  Command: ${skill.command}`));
          console.log();
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(chalk.red(`Error: ${error.message}`));
        } else {
          console.error(chalk.red('An unknown error occurred.'));
        }
        process.exitCode = 1;
      }
    });

  return program;
}
