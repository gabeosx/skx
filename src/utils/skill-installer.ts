import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { Downloader } from './downloader';

export class SkillInstaller {
  /**
   * Installs a skill by copying its files to the target directory.
   * Ensures the parent directory of the target exists.
   * 
   * @param sourceDir The directory containing the skill's files.
   * @param targetDir The destination directory for the skill.
   */
  async install(sourceDir: string, targetDir: string): Promise<void> {
    try {
      // Ensure the parent directory (e.g., .gemini/skills/) exists
      const parentDir = path.dirname(targetDir);
      await fs.ensureDir(parentDir);

      // Copy the skill directory
      await fs.copy(sourceDir, targetDir);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to install skill: ${error.message}`);
      }
      throw new Error('An unknown error occurred during skill installation.');
    }
  }

  /**
   * Downloads a skill from a URL and installs it.
   * 
   * @param url The GitHub URL or other source URL.
   * @param targetDir The destination directory.
   */
  async installFromUrl(url: string, targetDir: string): Promise<void> {
    const tempDir = path.join(os.tmpdir(), `skx-skill-${Date.now()}`);
    
    try {
      await Downloader.download(url, tempDir);
      await this.install(tempDir, targetDir);
    } finally {
      // Cleanup temp directory
      await fs.remove(tempDir);
    }
  }
}