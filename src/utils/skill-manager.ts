import { AdapterRegistry } from './adapters.js';
import { Scope } from '../types/adapter.js';

export class SkillManager {
  async detectInstalledSkills(filter?: { agent?: string, scope?: string }): Promise<Map<string, string[]>> {
    const results = new Map<string, string[]>(); // Key: "AgentName - Scope", Value: Skill[]
    
    const adapters = filter?.agent 
      ? AdapterRegistry.getAll().filter(a => a.name === filter.agent)
      : AdapterRegistry.getAll();

    for (const adapter of adapters) {
      // If scope is specified, check only that scope
      // Else check both Workspace and User
      let scopesToCheck: Scope[] = [Scope.Workspace, Scope.User];
      
      if (filter?.scope) {
        // Simple string matching to enum
        const s = filter.scope as Scope;
        if (Object.values(Scope).includes(s)) {
            scopesToCheck = [s];
        }
      }

      for (const scope of scopesToCheck) {
        try {
            const skills = await adapter.listSkills(scope, process.cwd());
            if (skills.length > 0) {
                const key = `${adapter.name} - ${scope}`;
                results.set(key, skills);
            }
        } catch (e) {
            // Ignore errors (e.g. if detection fails or directory doesn't exist)
        }
      }
    }
    return results;
  }
}
