// storage.js - Local storage management for saved scenarios

const STORAGE_KEY = 'wellwise_scenarios';

export const storage = {
  // Get all saved scenarios
  getScenarios() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading scenarios:', error);
      return [];
    }
  },

  // Save a new scenario
  saveScenario(scenario) {
    try {
      const scenarios = this.getScenarios();
      const newScenario = {
        ...scenario,
        id: Date.now(),
        savedAt: new Date().toISOString()
      };
      scenarios.push(newScenario);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
      return newScenario;
    } catch (error) {
      console.error('Error saving scenario:', error);
      throw error;
    }
  },

  // Delete a scenario by ID
  deleteScenario(id) {
    try {
      const scenarios = this.getScenarios();
      const filtered = scenarios.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting scenario:', error);
      return false;
    }
  },

  // Update a scenario
  updateScenario(id, updates) {
    try {
      const scenarios = this.getScenarios();
      const index = scenarios.findIndex(s => s.id === id);
      if (index !== -1) {
        scenarios[index] = { ...scenarios[index], ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
        return scenarios[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating scenario:', error);
      return null;
    }
  },

  // Clear all scenarios
  clearAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing scenarios:', error);
      return false;
    }
  },

  // Get a single scenario by ID
  getScenario(id) {
    const scenarios = this.getScenarios();
    return scenarios.find(s => s.id === id);
  }
};

export default storage;
