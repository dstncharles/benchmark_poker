import Ember from 'ember';

export function initialize(/* container, application */) {
  Ember.$.ajaxSetup ({
    headers: {
      "X-Parse-Application-Id": 'uWEeAo9ey8yg9oHiNhSmfVdqmC6CDzwxEOkNfOeX',
      "X-Parse-REST-API-Key": 'KN3vVzbcBmJSA14FbQT5FAcFQJ0DAU0wjGx7ooOi'
    }
  });
}

export default {
  name: 'parse-tokens',
  initialize: initialize
};
