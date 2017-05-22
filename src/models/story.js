export default class Story {
  constructor(value, size, description) {
    this.value = value;
    this.size = size;
    this.description = description;
    this._remainingWork = size;
    this._assignee = null;
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