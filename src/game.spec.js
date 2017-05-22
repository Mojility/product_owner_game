import Game from './game';

class FakeStoryDeck {
  next() {}
}

class FakeLog {
  add() {}
}

class FakeStory {}

describe('Game', () => {

  let fakeDeck = new FakeStoryDeck();
  let fakeLog = new FakeLog();
  let game;

  beforeEach(() => {
    spyOn(fakeDeck, 'next');
    game = new Game(fakeLog, fakeDeck);
  });

  it('should start at round 0', () => {
    expect(game.round).toBe(0);
  });

  it('should advance a round', () => {
    game.tick();
    expect(game.round).toBe(1);
  });

  it('should pull a story card off the deck when advanced', () => {
    game.tick();
    expect(fakeDeck.next).toHaveBeenCalled();
  });
});