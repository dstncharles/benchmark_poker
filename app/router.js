import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard');
  this.route('opponents');
  this.route('location');
  this.route('bankroll');
  this.route('equity');
  this.route('chipsInPlay');
  this.route('preFlopRaise');
  this.route('login');
  this.route('register');
});

export default Router;
