import { searchAndSelectSkill } from './src/utils/skill-search';
import { intro, outro, cancel } from '@clack/prompts';
import chalk from 'chalk';

async function verify() {
  intro(chalk.inverse(' Phase 2 Verification '));
  
  try {
    const selectedSkill = await searchAndSelectSkill();
    
    if (selectedSkill) {
      console.log(`\nSUCCESS: Selected skill: ${selectedSkill.name} (${selectedSkill.packageName})`);
    } else {
      console.log('\nINFO: No skill selected (cancelled or no results).');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red(`\nError: ${error.message}`));
    }
  }

  outro('Verification Complete');
}

verify().catch(console.error);
