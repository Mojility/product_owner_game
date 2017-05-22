import '../styles/styles.scss';

// comment out if you don't want a Promise polyfill (remove also from webpack.config.babel.js)
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .globalResources('value_converters/decimal_value_converter');

  await aurelia.start();
  aurelia.setRoot('app');
}