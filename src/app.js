export class App {
  configureRouter(config, router) {
    config.title = 'Starter';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: './home', nav: true, title: 'Home'}
    ]);

    this.router = router;
  }
}
