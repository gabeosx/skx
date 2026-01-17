import fs from 'fs-extra';
import path from 'path';

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
}