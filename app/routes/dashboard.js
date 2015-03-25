import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      chips: this.findChipsInPlay(),
      raises: this.findRaises(),
      comments: this.store.findAll('comment')
    });
  },

  findChipsInPlay: function() {
    return ajax('https://random-hands.herokuapp.com/hands/1').then(function(data) {
      // data is an array of snapshots of the hand history after each hand is played

      // gameData is the last game snapshot at the end of the game
      //   and contains all the hands with all actions
      var gameData = data.slice(-1).pop();

      // some of the hands are messed up. We'll filter those out by return only the hands that have seatsInfo
      var cleanData = gameData.filterBy('seatsInfo');
      return cleanData;
    });
  },

  findRaises: function(){
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
