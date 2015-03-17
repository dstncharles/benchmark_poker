import Ember from 'ember';

export default Ember.Route.extend({
 model: function() {
   return Ember.$.ajax('https://random-hands.herokuapp.com/hands/1').then(function(data) {
     console.log(data);
     console.log(data.slice(-1).pop());
     return data.slice(-1).pop();
   }).then(function(hands) {
     console.log(hands.slice(-1).pop());
     return hands.slice(-1).pop();
   }).then(function(hand){
     if (hand.seatsInfo) {
       console.log('Seat Info Found');
       var tableStack = hand.seatsInfo.reduce(function(acc, player) {
         return acc + Number(player.stackSize);
       }, 0);
       console.log('tableStack: ' + tableStack);
     } else {
       console.log('No Seat Info');
     }
   });
 }
});
