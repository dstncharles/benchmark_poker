import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return {
      chartData: {
        labels: ['Player1', 'Player2', 'Player3'],
        series: [
          [8, 6, 4],

        ]
      }
    };
  }
});
