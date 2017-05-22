import { inject } from 'aurelia-framework';
import Game from './game';

@inject(Game)
export class Home {
  constructor(game) {
    this.game = game;
    setInterval(_ => game.tick(), 1000);
  }

  attached() {
    window.addEventListener('keyup', $event => {
      switch ($event.key.toLowerCase()) {
        case 'a':
          this.game.acceptFirstStory();
          break;
        case 'r':
          this.game.rejectFirstStory();
          break;
        case 'h':
          this.game.hireFirstCandidate();
          break;
      }
    });
  }
}
