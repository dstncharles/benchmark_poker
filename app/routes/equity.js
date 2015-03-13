import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return {
      chartData: {
        labels: ['Player1', 'Player2', 'Player3', 'Player4','Player5','Player6','Player7'],
        series: [
          [8, 6, 4, 5, 7, 9, 10],

        ]
      }
    };
  }
});
