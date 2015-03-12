import Ember from 'ember';

export default Ember.ObjectController.extend({
  timeframe: ['All','Last 7 Days','Last 30 Days', 'Last 90 Days', 'Last 6 Month', 'Last 12 Month', 'Current Day', 'Current Week', 'Current Month', 'Custom Date Range'],
  game: ['Texas Holdem', 'Omaha'],
  structure: ['No Limit', 'Limit'],
  limits: ['.25-.50', '1-2'],

});
