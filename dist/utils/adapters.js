export class AdapterRegistry {
    static adapters = new Map();
    static register(adapter) {
        this.adapters.set(adapter.name, adapter);
    }
    static get(name) {
        return this.adapters.get(name);
    }
    static getAll() {
        return Array.from(this.adapters.values());
    }
    static clear() {
        this.adapters.clear();
    }
}
