import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard');
  this.route('sessions');
  this.route('equity');
  this.route('opponents');
  this.route('locations');
  this.route('hand_range');

});

export default Router;
