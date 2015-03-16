import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return {
      chartData: {
        labels: ['Player1', 'Player2', 'Player3', 'Player4','Player5','Player6','Player7','Player8','Player9','Player10'],
        series: [
          [8, 6, 4, 5, 7, 9, 10, 2, 4, 1, 6],
          [0, 2, 3, 2, 3],
          [1, 2, 2.5, 3.5, 4]

        ]
      }
    };
  }
});
