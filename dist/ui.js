import { intro, outro, text, isCancel, cancel, spinner } from '@clack/prompts';
import { fetchRegistry } from './utils/registry.js';
import { searchSkills } from './utils/search.js';
import chalk from 'chalk';
export async function startInteractiveMode() {
    intro(chalk.inverse(' skx '));
    const query = await text({
        message: 'Search for a skill:',
        placeholder: 'e.g. react',
    });
    if (isCancel(query)) {
        cancel('Operation cancelled.');
        process.exit(0);
    }
    const s = spinner();
    s.start('Fetching registry...');
    try {
        const skills = await fetchRegistry();
        s.stop('Registry fetched.');
        const results = searchSkills(skills, query);
        if (results.length === 0) {
            console.log(chalk.yellow('No skills found.'));
        }
        else {
            console.log(chalk.green(`Found ${results.length} skills:`));
            results.forEach((skill) => {
                console.log(chalk.bold(skill.name));
                console.log(`  ${skill.description}`);
                console.log(chalk.dim(`  Package: ${skill.packageName}`));
                console.log(chalk.blue(`  URL: ${skill.githubRepoUrl}`));
                console.log();
            });
        }
    }
    catch (error) {
        s.stop('Failed to fetch registry.');
        if (error instanceof Error) {
            console.error(chalk.red(`Error: ${error.message}`));
        }
    }
    outro('Done!');
}
