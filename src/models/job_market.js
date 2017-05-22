import { inject } from 'aurelia-framework';
import Developer from './developer';
import Log from '../util/log';

class Candidate {
  constructor(developer, age) {
    this.developer = developer;
    this.ticksOnMarket = age;
  }

  get name() {
    return this.developer.name;
  }

  tick() {
    this.ticksOnMarket++;
  }
}

@inject(Log)
export default class JobMarket {
  candidateAvailability = 0.1;
  candidates = [];
  marketHotness = 5;

  constructor(log) {
    this.log = log;
    this.addNewCandidate();
  }

  tick() {
    if (Math.random() < this.candidateAvailability) this.addNewCandidate();
    this.candidates.forEach(c => c.tick());
    this.candidates = this.candidates.filter(c => {
      if (c.ticksOnMarket > this.marketHotness) {
        this.log.add(`${c.name} was hired elsewhere.`);
        return false;
      } else {
        return true;
      }
    });
  }

  addNewCandidate() {
    let candidate = new Candidate(new Developer(), 0);
    this.candidates.push(candidate);
    this.log.add(`New developer on the market ${candidate.name}`);
  }

  hire(candidate) {
    this.candidates.splice(this.candidates.indexOf(candidate), 1);
  }
}