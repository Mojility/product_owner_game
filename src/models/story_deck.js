import faker from 'faker';
import Story from './story';

const MaxValue = 3;
const MaxSize = 3;

export default class StoryDeck {
  next() {
    let value = Math.ceil((Math.random() * MaxValue));
    let size = Math.ceil((Math.random() * MaxSize));
    let description = faker.lorem.sentence();
    return new Story(value, size, description);
  }
}