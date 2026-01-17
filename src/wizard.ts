import { select, confirm, isCancel, note } from '@clack/prompts';
import { searchAndSelectSkill } from './utils/skill-search.js';
import { FrameworkResolver } from './utils/framework-resolver.js';
import { ScopeResolver } from './utils/scope-resolver.js';
import { AdapterRegistry } from './utils/adapters.js';
import { Scope, type AgentFrameworkAdapter } from './types/adapter.js';
import { type Skill } from './utils/registry.js';
import chalk from 'chalk';

export interface WizardResult {
  skill: Skill;
  agent: AgentFrameworkAdapter;
  scope: Scope;
}

/**
 * Runs the interactive installation wizard.
 * 
 * Flow:
 * 1. Search and select a skill.
 * 2. Detect environment (Agent and Scope).
 * 3. Confirm/Select Agent.
 * 4. Confirm/Select Scope.
 * 5. Display summary and confirm installation.
 */
export async function runWizard(): Promise<WizardResult | undefined> {
  // 1. Skill Selection
  const skill = await searchAndSelectSkill();
  if (!skill) return undefined;

  const cwd = process.cwd();
  const frameworkResolver = new FrameworkResolver();
  const scopeResolver = new ScopeResolver();

  // 2. Detection
  const detectedAgents = await frameworkResolver.detect(cwd);
  const detectedScope = await scopeResolver.resolve(cwd);

  // 3. Agent Selection
  const allAgents = AdapterRegistry.getAll();
  const agentSelection = await select({
    message: 'Select target AI agent:',
    options: allAgents.map((a) => ({
      value: a,
      label: a.name,
      hint: detectedAgents.some(da => da.name === a.name) ? '(detected)' : undefined,
    })),
    initialValue: detectedAgents.length > 0 ? detectedAgents[0] : undefined,
  });

  if (isCancel(agentSelection)) return undefined;
  const agent = agentSelection as AgentFrameworkAdapter;

  // 4. Scope Selection
  const scopeSelection = await select({
    message: 'Select installation scope:',
    options: [
      { value: Scope.Workspace, label: 'Workspace', hint: 'Local to this project' },
      { value: Scope.User, label: 'User', hint: 'Global for your user (~/)' },
    ],
    initialValue: detectedScope,
  });

  if (isCancel(scopeSelection)) return undefined;
  const scope = scopeSelection as Scope;

  // 5. Confirmation Summary
  note(
    `Skill:  ${chalk.cyan(skill.name)}
` +
    `Agent:  ${chalk.cyan(agent.name)}
` +
    `Scope:  ${chalk.cyan(scope)}
` +
    `Path:   ${chalk.dim('Determined by agent adapter')}`,
    'Installation Summary'
  );

  const confirmed = await confirm({
    message: 'Proceed with installation?',
  });

  if (isCancel(confirmed) || !confirmed) return undefined;

  return { skill, agent, scope };
}
