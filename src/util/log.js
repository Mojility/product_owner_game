export default class Log {
  entries = [];

  add(entry) {
    this.entries.push(entry);
  }
}