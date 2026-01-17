export function searchSkills(skills, query) {
    if (!query) {
        return skills;
    }
    const lowerQuery = query.toLowerCase();
    return skills.filter((skill) => {
        return (skill.name.toLowerCase().includes(lowerQuery) ||
            skill.description.toLowerCase().includes(lowerQuery));
    });
}
