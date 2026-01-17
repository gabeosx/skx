import { AgentFrameworkAdapter } from '../types/adapter.js';

export class AdapterRegistry {
  private static adapters: Map<string, AgentFrameworkAdapter> = new Map();

  static register(adapter: AgentFrameworkAdapter): void {
    this.adapters.set(adapter.name, adapter);
  }

  static get(name: string): AgentFrameworkAdapter | undefined {
    return this.adapters.get(name);
  }

  static getAll(): AgentFrameworkAdapter[] {
    return Array.from(this.adapters.values());
  }

  static clear(): void {
    this.adapters.clear();
  }
}
