import { inject } from 'aurelia-framework';
import JobMarket from './models/job_market';
import { StoryType } from './models/story';
import StoryDeck from './models/story_deck';
import Team from './models/team';
import Log from './util/log';
import { Settings } from './settings';

@inject(Log, JobMarket, Team, StoryDeck)
export default class Game {
  cashOnHand = Settings.initialBudget;
  customers = 0;
  _income = 0;
  round = 0;
  unspentCapability = 0;
  valueDelivered = 0;
  backlog = [];
  completed = [];
  in_consideration = [];

  constructor(log, jobMarket, team, storyDeck) {
    this.log = log;
    this.jobMarket = jobMarket;
    this.team = team;
    this.storyDeck = storyDeck;
  }

  hireFirstCandidate() {
    if (this.jobMarket.candidates.length > 0) this.hire(this.jobMarket.candidates[0]);
  }

  hire(candidate) {
    this.jobMarket.hire(candidate);
    this.team.hire(candidate.developer);
    this.log.add(`Hired ${candidate.developer.name}`);
  }

  tick() {
    this.round++;
    this.addNewSuggestions();
    this.jobMarket.tick();
    this.applyWork();
    this.team.tick();
    this.storiesTick();
    this.addDefects();
    this.cashOnHand -= this.team.cycleCost;
    this.calculateValueDelivered();
    this.addCustomers();
    this.removeCustomersDueToOpenBugs();
    this.calculateIncome();
  }

  storiesTick() {
    this.in_consideration.forEach(s => s.tickWhileWaiting());
    this.backlog.forEach(s => s.tickWhileWaiting());
    this.completed.forEach(s => s.tickInProduction());
  }

  addDefects() {
    this.completed.forEach(s => {
      if (Math.random() < s.chanceOfDefect) {
        let defect = this.storyDeck.createDefect(s);
        this.in_consideration.push(defect);
      }
    });
  }

  addCustomers() {
    if (this.valueDelivered > Settings.valueRequiredForMVP) {
      this.customers = Math.floor(this.customers + this.valueDelivered * Settings.newCustomersPerDeliveredValuePerCycle);
    }
  }

  removeCustomersDueToOpenBugs() {
    let openDefects = this.in_consideration.filter(s => s.type === StoryType.defect).length;
    this.customers = Math.floor(this.customers - openDefects * Settings.customerLossPerCyclePerOpenBug);
    if (this.customers < 0) this.customers = 0;
  }

  calculateIncome() {
    this._income = this.customers * this.valueDelivered * Settings.incomeForValueDeliveredFactor;
    this.cashOnHand += this._income;
  }

  get income() {
    return this._income;
  }

  calculateValueDelivered() {
    this.valueDelivered = this.completed.reduce((total, story) => total + story.value, 0);
  }

  applyWork() {
    if (this.team.size > 0) {
      let totalPotential = this.team.totalPotential;
      let totalActual = this.team.totalActual;
      let remainingActual = totalActual;
      this.backlog.forEach(story => {
        if (remainingActual > 0 && story.remainingWork > 0) {
          remainingActual = story.progress(remainingActual);
        }
      });
      this.backlog.filter(s => s.remainingWork === 0).map(s => this.completed.push(s));
      this.backlog = this.backlog.filter(s => s.remainingWork > 0);
      this.unspentCapability += totalPotential - totalActual + remainingActual;
    }
  }

  addNewSuggestions() {
    let factor = Settings.story.maxNewStoriesPerCycle;
    if (factor >= 1) {
      let quantity = Math.ceil(Math.random() * factor);
      for (let i = 0; i < quantity; i++)
        this.in_consideration.push(this.storyDeck.next());
    } else {
      if (Math.random() < factor) {
        this.in_consideration.push(this.storyDeck.next());
      }
    }
  }

  acceptFirstStory() {
    if (this.in_consideration.length > 0) this.accept(this.in_consideration[0]);
  }

  rejectFirstStory() {
    if (this.in_consideration.length > 0) {
      let story = this.in_consideration[0];
      if (story.type === StoryType.feature)
        this.reject(story);
    }
  }

  accept(story) {
    this.in_consideration.splice(this.in_consideration.indexOf(story), 1);
    this.backlog.push(story);
    this.log.add(`Accepted ${story.description}`);
  }

  reject(story) {
    this.in_consideration.splice(this.in_consideration.indexOf(story), 1);
    this.log.add(`Rejected ${story.description}`);
  }
}
