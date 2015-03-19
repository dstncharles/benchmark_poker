
import Ember from 'ember';

export default Ember.Controller.extend({

  playerAggression: function(){
    return this.get('model').mapBy('preflopActions').map(function(flopActions){
      console.log(flopActions);

    });


  }.property('model.@each'),

});

// .map(function(playersSeats){
//   return playersSeats.mapBy('player').map(function()};

//get player and his actions
//filter the actions have raise and allin
//the sum the actions in new array
