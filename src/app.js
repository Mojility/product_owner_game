export class App {
  configureRouter(config, router) {
    config.title = 'Product Owner Game';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Home'}
    ]);

    this.router = router;
  }
}
