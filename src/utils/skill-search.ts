import { text, select, isCancel } from '@clack/prompts';
import { fetchRegistry, type Skill } from './registry.js';
import { searchSkills } from './search.js';

/**
 * Interactive skill discovery function.
 * Prompts user for a search query and then presents a list of results to select from.
 */
export async function searchAndSelectSkill(): Promise<Skill | undefined> {
  let skills: Skill[];
  try {
    skills = await fetchRegistry();
  } catch (error) {
    throw new Error('Failed to fetch skill registry.');
  }
  
  let query = '';

  while (true) {
    const userInput = await text({
      message: 'Search for a skill:',
      placeholder: 'e.g. react',
      defaultValue: query,
    });

    if (isCancel(userInput)) return undefined;
    query = userInput as string;

    const results = searchSkills(skills, query);

    if (results.length === 0) {
      const retry = await select({
        message: 'No skills found. Try again?',
        options: [
          { value: 'retry', label: 'Yes, search again' },
          { value: 'cancel', label: 'No, cancel' },
        ],
      });
      if (isCancel(retry) || retry === 'cancel') return undefined;
      continue;
    }

    const selection = await select({
      message: `Found ${results.length} skills. Select one:`,
      options: [
        ...results.map((skill) => ({
          value: skill,
          label: skill.name,
          hint: skill.description,
        })),
        { value: 'search_again' as any, label: '-- Search again --' },
      ],
    });

    if (isCancel(selection)) return undefined;
    if (selection === 'search_again') {
      // Clear query for new search if they select search again?
      // Or keep it? The test expects it to loop.
      continue;
    }

    return selection as Skill;
  }
}
