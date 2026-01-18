import { intro, outro, cancel, spinner } from '@clack/prompts';
import { runWizard } from './wizard.js';
import { SkillInstaller } from './utils/skill-installer.js';
import chalk from 'chalk';

export async function startInteractiveMode() {
  intro(chalk.inverse(' skx '));

  try {
    const result = await runWizard();

    if (!result) {
      cancel('Installation cancelled.');
      process.exit(0);
    }

    const { skill, agent, scope } = result;
    const s = spinner();
    s.start(`Installing ${skill.name} for ${agent.name}...`);

    // In a real implementation, we would download the skill first.
    // For now, we simulate the installation using the installer.
    // The installer expects sourceDir and targetDir.
    // We need to resolve the target directory using the adapter.
    
    const targetDir = await agent.getInstallationPath(scope, process.cwd());
    const installer = new SkillInstaller();
    
    await installer.installFromUrl(skill.githubRepoUrl, targetDir);
    
    s.stop(`Successfully installed ${skill.name}!`);
    
    console.log(chalk.bold('\nPost-Installation Instructions:'));
    console.log(agent.getPostInstallInstructions());

  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red(`\nError: ${error.message}`));
    }
  }

  outro('Done!');
}

