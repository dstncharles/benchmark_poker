import Ember from 'ember';

export default Ember.Controller.extend({

 playerAggression: function(){
   // 1. get an array of arrays of preflopActions
   // 2. extract array of arrays of player names who have raised
   // 3. flatten (2) into a single array of names
   // 4. group names by count e.g. {person1: 5, person2: 6}
   return this.get('model').mapBy('preflopActions').map(function(flopActions){

     flopActions = flopActions || [];
     return flopActions.filterBy('action', 'raises').mapBy('player');
   }).reduce(function(acc, raisers){
     return acc.concat(raisers);
   }, []).reduce(function(acc, raiser){
     acc[raiser] = acc[raiser] || 0;
     acc[raiser] += 1;
     return acc;
   }, {});

 }.property('model.@each'),

});
// .map(function(playersSeats){
//   return playersSeats.mapBy('player').map(function()};

//get player and his actions
//filter the actions have raise and allin
//the sum the actions in new array
