import Ember from 'ember';

export default Ember.Controller.extend({
  stackSizes: function(){
    return this.get('model').mapBy('seatsInfo').map(function(handSeats){
      //pluck(mapBy)
      return handSeats.mapBy('stackSize').reduce(function(sum, stackSize){
        // Number(stackSize) transforms stackSize from a string to a number
        return sum + Number(stackSize);
      }, 0);
    });
  }.property('model.@each'),

  handCount: Ember.computed.alias('model.length')
});
