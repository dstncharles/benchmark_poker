import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return {
      locationData: {
        labels: ['Player1', 'Player2', 'Player3'],
        series: [
          [8, 6, 4],
        ]
      },
      opponentsData: {
        labels: ['Player1', 'Player2', 'Player3', 'Player4'],
        series: [
          [8, 6, 4, 5],
        ]
      },
      bankrollData: {
        labels: ['Day1', 'Day2', 'Day3','Day4','Day5','Day5','Day6','Day6','Day7','Day8','Day9','Day10'],
        series: [
          [8, 6, 4, 7, 5, 2, 10, 9, 6, 9,],
        ]
      },
      equityData: {
        labels: ['Player1', 'Player3', 'Player4'],
        series: [
          [8, 6, 4, 5, 6, 4, 5],
        ]
      },
    };
  }
});
