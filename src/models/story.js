import { Settings } from '../settings';

export const StoryType = {
  defect: 'defect',
  feature: 'feature'
};

export class Story {

  _timeInProduction = 0;
  _age = 0;
  defects = [];

  constructor(value, size, description, type) {
    this.size = size;
    this.description = description;
    this._remainingWork = size;
    this._value = value;
    this._type = type;
  }

  get type() {
    return this._type;
  }

  get isDefect() {
    return this._type === StoryType.defect;
  }

  get isFeature() {
    return this._type === StoryType.feature;
  }

  get age() {
    return this._age;
  }

  get chanceOfDefect() {
    return 1/this._timeInProduction * this.size * Settings.story.baseDefectRate;
  }

  get value() {
    return this._value;
  }

  get valueLabel() {
    return '$'.repeat(this.value);
  }

  get sizeLabel() {
    return '◼︎'.repeat(this.size);
  }

  get remainingWork() {
    return this._remainingWork;
  }

  get assignee() {
    return this._assignee;
  }

  assign(developer) {
    this._assignee = developer;
  }

  tickWhileWaiting() {
    this._age++;
  }

  tickInProduction() {
    this._timeInProduction++;
  }

  progress(amount) {
    if (this._remainingWork > amount) {
      this._remainingWork -= amount;
      return 0;
    } else {
      let remainder = amount - this._remainingWork;
      this._remainingWork = 0;
      return remainder;
    }
  }
}