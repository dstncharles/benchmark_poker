import Ember from 'ember';

export default Ember.ObjectController.extend({
  timeframe: ['All','Last 7 Days','Last 30 Days', 'Last 90 Days', 'Last 6 Month', 'Last 12 Month', 'Current Day', 'Current Week', 'Current Month', 'Custom Date Range']
});
