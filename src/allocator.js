class Assignment {
  constructor(work, developer) {
    this.work = work;
    this.developer = developer;
  }
}

export default class Allocator {
  assignments = [];

  isUnassigned(work) {
    return !this.assignments.map(a => a.work).includes(work);
  }

  assignFirstDeveloper(work, team) {
    let available = team.filter(d => !this.isDeveloperAssigned(d));
    if (available.length === 0) throw "No available developers";
    this.assign(work, available[ 0 ]);
    return available[0];
  }

  assignFirstWork(developer, backlog) {
    let available = backlog.filter(w => !this.isWorkAssigned(w));
    if (available.length === 0) throw "No available work";
    this.assign(available[ 0 ], developer);
    return available[0];
  }

  assign(work, developer) {
    this.assignments.push(new Assignment(work, developer));
    work.assign(developer);
  }

  unassign(work, developer) {
    let candidates = this.assignments.filter(a => a.work === work && a.developer === developer);
    candidates.forEach(a => {
      this.assignments.splice(this.assignments.indexOf(a), 1);
    });
  }

  assignedDeveloper(work) {
    let candidates = this.assignments.filter(a => a.work === work);
    if (candidates.length === 0) throw "No assigned developer";
    return candidates[ 0 ].developer;
  }

  assignedWork(developer) {
    let candidates = this.assignments.filter(a => a.developer === developer);
    if (candidates.length === 0) throw "New assigned work";
    console.log('assignedWork', candidates);
    return candidates[ 0 ].work;
  }

  isDeveloperAssigned(developer) {
    return this.assignedDevelopers().includes(developer);
  }

  isWorkAssigned(work) {
    return this.assignedWorks().includes(work);
  }

  assignedWorks() {
    return this.assignments.map(a => a.work);
  }

  assignedDevelopers() {
    return this.assignments.map(a => a.developer);
  }
}