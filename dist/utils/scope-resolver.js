import fs from 'fs-extra';
import path from 'path';
import { Scope } from '../types/adapter.js';
export class ScopeResolver {
    async resolve(cwd) {
        const indicators = ['.git', 'package.json', 'go.mod', 'Cargo.toml', 'requirements.txt', '.gemini', '.claudecode'];
        for (const indicator of indicators) {
            if (await fs.pathExists(path.join(cwd, indicator))) {
                return Scope.Workspace;
            }
        }
        return Scope.User;
    }
}
