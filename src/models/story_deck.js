import faker from 'faker';
import { Settings } from '../settings';
import { Story, StoryType } from './story';

let SIZES = Settings.story.sizes;
let VALUES = Settings.story.values;

export default class StoryDeck {
  next() {
    let description = faker.lorem.sentence();
    return new Story(this.randomValue, this.randomSize, description, StoryType.feature);
  }

  createDefect(story) {
    let defect = new Story(0, this.randomValue, story.description, StoryType.defect);
    story.defects.push(defect);
    return defect;
  }

  get randomSize() {
    return SIZES[Math.floor((Math.random() * VALUES.length))];
  }

  get randomValue() {
    return VALUES[Math.floor((Math.random() * SIZES.length))];
  }
}