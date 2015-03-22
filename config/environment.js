/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'benchmark-poker',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'connect-src': "'self' https://random-hands.herokuapp.com, https://api.parse.com",
      'style-src': "'self' *.googleapis.com 'unsafe-inline'",
      'font-src': "'self' *.gstatic.com",
      // 'img-src': "'self' *.http://files.parsefss.com",


    },

    'simple-auth': {
      authorizer: 'authorizer:parse',
      crossOriginWhitelist: ['https://api.parse.com']
    },

    parseKeys: {
      applicationId: "uWEeAo9ey8yg9oHiNhSmfVdqmC6CDzwxEOkNfOeX",
      restApi: "KN3vVzbcBmJSA14FbQT5FAcFQJ0DAU0wjGx7ooOi"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
