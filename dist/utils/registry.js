import axios from 'axios';
import { z } from 'zod';
export const SkillSchema = z.object({
    name: z.string(),
    packageName: z.string(),
    description: z.string(),
    githubRepoUrl: z.string(),
    tags: z.array(z.string()),
    command: z.string().optional(),
    author: z.string().optional(),
    version: z.string().optional(),
});
export const RegistrySchema = z.array(SkillSchema);
const REGISTRY_URL = 'https://raw.githubusercontent.com/gabeosx/agentskillsdir/main/public/skills.json';
export async function fetchRegistry() {
    try {
        const response = await axios.get(REGISTRY_URL);
        const result = RegistrySchema.safeParse(response.data);
        if (!result.success) {
            throw new Error('Invalid registry format');
        }
        return result.data;
    }
    catch (error) {
        if (error instanceof Error && error.message === 'Invalid registry format') {
            throw error;
        }
        throw new Error('Failed to fetch registry');
    }
}
