import Jasmine from 'jasmine';
var reporters = require('jasmine-reporters');

var jasmine = new Jasmine();

var junitReporter = new reporters.JUnitXmlReporter({
      savePath: '.',
      consolidateAll: true
});
jasmine.addReporter(junitReporter);

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();
