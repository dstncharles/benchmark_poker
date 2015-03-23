import Ember from 'ember';

export default Ember.Controller.extend({
  // TODO: make this look like the format below
  stackSizes: function(){
    return this.get('model.chips').mapBy('seatsInfo').map(function(handSeats){
      //pluck(mapBy)
      return handSeats.mapBy('stackSize').reduce(function(sum, stackSize){
        // Number(stackSize) transforms stackSize from a string to a number
        return sum + Number(stackSize);
      }, 0);
    });
  }.property('model.chips.@each'),

  handCount: Ember.computed.alias('model.chips.length'),

  // stackSizes: {
  //   // A labels array that can contain any sort of values
  //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  //   // Our series array that contains series objects or in this case series data arrays
  //   series: [
  //     [5, 2, 4, 2, 0]
  //   ]
  // },
  //
  // chartOptions: {
  //   width: '300px',
  //   height: '200px'
  // }
});
