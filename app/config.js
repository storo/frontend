var Config = Ember.Object.extend({
  
  host: "http://192.168.1.37:3000",
  path: '/v1/',
  client_id: '8987479cdf968a8520db35be70a1f455b68860e966f5a819ec97a79f47e78c8e',
  client_secret: '2f8f549c21ae2229021985879f62946296bcb1f7b1b1fe6f5441ae01a1160ea5'
});

Ember.Application.initializer({
  name: "config",
  initialize: function(container, application) {
    application.register('config:main', Config);
    application.inject('route', 'config', 'config:main');
    application.inject('controller', 'config', 'config:main');
  }
});

export default Config;
