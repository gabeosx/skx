import { Command, Option } from 'commander';
import chalk from 'chalk';
import { fetchRegistry } from './utils/registry.js';
import { searchSkills } from './utils/search.js';
import { FrameworkResolver } from './utils/framework-resolver.js';
import { SkillInstaller } from './utils/skill-installer.js';
import { Scope } from './types/adapter.js';
import { spinner } from '@clack/prompts';
export function createProgram() {
    const program = new Command();
    program
        .name('skx')
        .description('A CLI tool to discover and install skills')
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
                console.log(chalk.dim(`  Package: ${skill.packageName}`));
                console.log(chalk.blue(`  URL: ${skill.githubRepoUrl}`));
                console.log();
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red(`Error: ${error.message}`));
            }
            else {
                console.error(chalk.red('An unknown error occurred.'));
            }
            process.exitCode = 1;
        }
    });
    program
        .command('install')
        .description('Install a skill for your AI agent framework')
        .argument('<skill-name>', 'Name of the skill to install')
        .addOption(new Option('-f, --framework <name>', 'Explicitly specify the agent framework (e.g., gemini, claude, codex)'))
        .addOption(new Option('-s, --scope <type>', 'Installation scope').choices(['workspace', 'user']).default('workspace'))
        .action(async (skillName, options) => {
        const s = spinner();
        let spinnerStarted = false;
        try {
            // 1. Fetch Skill Info
            s.start(`Searching for skill: ${skillName}`);
            spinnerStarted = true;
            const skills = await fetchRegistry();
            const skill = skills.find(s => s.name === skillName || s.packageName === skillName);
            if (!skill) {
                s.stop(`Skill "${skillName}" not found in registry.`, 1);
                process.exitCode = 1;
                return;
            }
            s.stop(`Found skill: ${skill.name}`);
            spinnerStarted = false;
            // 2. Resolve Framework
            const resolver = new FrameworkResolver();
            const adapter = await resolver.resolve(process.cwd(), options.framework);
            // 3. Determine Paths
            const scope = options.scope === 'user' ? Scope.User : Scope.Workspace;
            const targetPath = await adapter.getInstallationPath(scope, process.cwd());
            s.start(`Downloading and installing to ${targetPath}...`);
            spinnerStarted = true;
            const installer = new SkillInstaller();
            await installer.installFromUrl(skill.githubRepoUrl, targetPath);
            s.stop(`Successfully installed ${skill.name}!`);
            spinnerStarted = false;
            console.log('\n' + chalk.bold('Post-Installation Instructions:'));
            console.log(adapter.getPostInstallInstructions());
        }
        catch (error) {
            if (spinnerStarted) {
                s.stop('Installation failed.', 1);
            }
            if (error instanceof Error) {
                console.error(chalk.red(`Error: ${error.message}`));
            }
            else {
                console.error(chalk.red('An unknown error occurred.'));
            }
            process.exitCode = 1;
        }
    });
    return program;
}
