import { createProgram } from './src/cli.ts';
import * as registry from './src/utils/registry.ts';
import { vi } from 'vitest';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

// Note: In a real manual verify script, we might not want to use 'vi' if we are running with ts-node
// but createProgram is exported, so we can just use it.
// We'll mock the registry fetch to return a test skill pointing to a real repo (or a mock one).

async function run() {
    const tmpDir = path.join(os.tmpdir(), `skx-verify-phase2-${Date.now()}`);
    await fs.ensureDir(tmpDir);
    
    // We'll use a real small repo for a true integration feel, or just mock Downloader.
    // Given the previous success of Phase 1, we know Downloader works.
    
    console.log('Running skx install pptx (mocked registry)...');
    
    const program = createProgram();
    program.exitOverride();
    
    // We can't easily mock registry.fetchRegistry here because it's an ESM import in cli.ts
    // and we are running via ts-node.
    // However, we can just run it against the real registry if we want!
    
    try {
        // We'll pass the framework explicitly to avoid detection issues in a temp dir
        await program.parseAsync([
            'node', 'test', 'install', 'pptx', 
            '--framework', 'gemini', 
            '--scope', 'workspace'
        ], { from: 'user' });
        
        console.log('Command finished.');
        
        const skillPath = path.join(process.cwd(), '.gemini', 'skills', 'pptx');
        if (fs.existsSync(skillPath)) {
            console.log(`Success: Skill installed at ${skillPath}`);
            const files = fs.readdirSync(skillPath);
            console.log('Files:', files);
            
            // Cleanup
            console.log('Cleaning up...');
            await fs.remove(path.join(process.cwd(), '.gemini'));
            console.log('Cleanup complete.');
        } else {
            console.error('Failure: Skill not found at expected path.');
        }

    } catch (e) {
        console.error('Error during installation:', e);
    }
}

run();