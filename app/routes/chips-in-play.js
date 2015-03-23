import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      chips: this.findChipsInPlay(),
      comments: this.store.findAll('comment'),
      newComment: this.store.createRecord('comment'),

      chartData: {
        labels: ['Player1', 'Player2', 'Player3', 'Player4','Player5','Player6','Player7','Player8','Player9','Player10'],
        series: [
          [8, 6, 4, 5, 7, 9, 10, 2, 4, 1, 6],
          [0, 2, 3, 2, 3],
          [1, 2, 2.5, 3.5, 4]

        ]
      }
    });
  },

  actions: {
    saveComment: function(){
      console.log('saveComment function firing');
      this.modelFor('chips-in-play').get('newComment').save();
    }
  },

  findChipsInPlay: function(){
    return ajax('https://random-hands.herokuapp.com/hands/1').then(function(data) {
      // data is an array of snapshots of the hand history after each hand is played

      // gameData is the last game snapshot at the end of the game
      //   and contains all the hands with all actions
      var gameData = data.slice(-1).pop();

      // some of the hands are messed up. We'll filter those out by return only the hands that have seatsInfo
      var cleanData = gameData.filterBy('seatsInfo');
      return cleanData;
    });
  }
});
