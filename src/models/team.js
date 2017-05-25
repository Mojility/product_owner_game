import { Settings } from '../settings';

export default class Team {

  members = [];

  hire(developer) {
    this.members.push(developer);
  }

  get size() {
    return this.members.length;
  }

  get totalPotential() {
    return this.members
      .reduce((t, d) => t + d.capability, 0);
  }

  get distractibility() {
    return this.members
        .reduce((t, d) => t + d.distractible, 0) * Settings.team.distractibilityFactor * this.size;
  }

  get totalActual() {
    return this.members
        .reduce((t, d) => t + d.adjustedCapability, 0) - this.distractibility;
  }

  get cycleCost() {
    return this.size > 0 ? this.members
      .reduce((t, d) => t + d.salary, 0) : 0.0;
  }

  tick() {
    this.members.forEach(d => d.tick());
  }

}