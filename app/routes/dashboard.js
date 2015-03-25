import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return {
      chipsInPlayData: {
        labels: ['Player1', 'Player2', 'Player3'],
        series: [
          [8, 6, 4],
        ]
      },

      preFlopRaiseData: {
        labels: ['Player1', 'Player2', 'Player3', 'Player4'],
        series: [
          [8, 6, 4, 5],
        ]
      },
    };
  }
});
