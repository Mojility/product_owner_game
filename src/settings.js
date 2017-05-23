export const Settings = {
  initialBudget: 30000.00,
  teamDistractibilityFactor: 0.15,

  story: {
    sizes: [1,2,3,5,7],
    values: [1,2,3,5,7],
    maxNewStoriesPerCycle: 0.75,
    baseDefectRate: 0.04
  },

  employee: {
    levelMax: 10,
    capabilityScale: 1.5,
    salary: {
      base: 30000/365,
      rise: 100000/365
    }
  },

  valueRequiredForMVP: 100,
  newCustomersPerDeliveredValuePerCycle: 0.05,
  customerLossPerCyclePerOpenBug: 1,
  incomeForValueDeliveredFactor: 0.005
};