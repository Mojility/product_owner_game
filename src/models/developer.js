import { Settings } from '../settings';
import faker from 'faker';

export default class Developer {
  _name = faker.name.findName();
  _level = Math.random() * Settings.employee.levelMax;

  constructor() {
    this.adjustDistractibility();
  }

  get name() {
    return this._name;
  }

  get level() {
    return this._level;
  }

  get salary() {
    return Settings.employee.salary.base
      + this._level
      * Settings.employee.salary.rise
      / 10;
  }

  get annualSalary() {
    return this.salary * 365;
  }

  get distractible() {
    return this._distractible;
  }

  get capability() {
    return this.level / Settings.employee.levelMax;
  }

  get adjustedCapability() {
    return this.capability - this._distractible;
  }

  tick() {
    this.adjustDistractibility();
  }

  adjustDistractibility() {
    this._distractible = Math.random() * this.level / 20;
  }

}