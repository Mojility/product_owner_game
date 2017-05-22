import faker from 'faker';
import Allocator from './allocator';

describe('Allocator', () => {
  let fakeWork = { description: faker.lorem.sentence(), assign: () => {} };
  let fakeDeveloper = { name: faker.name.findName() };

  let allocator;

  beforeEach(() => {
    allocator = new Allocator();
  });

  it('should mark unassigned work as unassigned', () => {
    expect(allocator.isUnassigned(fakeWork)).toEqual(true);
  });

  it('should mark a developer as unavailable when assigned', () => {
    allocator.assign(fakeWork, fakeDeveloper);
    expect(allocator.assignedDevelopers()).toEqual([fakeDeveloper]);
    expect(allocator.isDeveloperAssigned(fakeDeveloper)).toEqual(true);
  });

  it('should assign first available developer', () => {
    allocator.assignFirstDeveloper(fakeWork, [fakeDeveloper]);
    expect(allocator.assignedDevelopers()).toEqual([fakeDeveloper]);
    expect(allocator.isDeveloperAssigned(fakeDeveloper)).toEqual(true);
  });

  it('should throw exception when trying to assign from empty team', () => {
    expect(() => {
      allocator.assignFirstDeveloper(fakeWork, []);
    }).toThrow();
  });
});