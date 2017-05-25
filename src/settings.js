export const Settings = {

  business: {
    valueRequiredForMVP: 100,
    newCustomersPerDeliveredValuePerCycle: 0.01,
    customerLossPerCyclePerOpenBug: 1
  },

  financial: {
    initialBudget: 30000.00,
    incomeForValueDeliveredFactor: 0.01
  },


  story: {
    sizes: [1,2,3,5,7],
    values: [1,2,3,5,7],
    maxNewStoriesPerCycle: 0.85,
    baseDefectRate: 0.03
  },

  team: {
    distractibilityFactor: 0.15
  },

  employee: {
    levelMax: 10,
    capabilityScale: 2.5,
    salary: {
      base: 30000/365,
      rise: 100000/365
    }
  }
};