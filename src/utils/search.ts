import { type Skill } from './registry.js';

export function searchSkills(skills: Skill[], query: string): Skill[] {
  if (!query) {
    return skills;
  }

  const lowerQuery = query.toLowerCase();

  return skills.filter((skill) => {
    return (
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.description.toLowerCase().includes(lowerQuery)
    );
  });
}
