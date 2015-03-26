import Ember from 'ember';

export default Ember.Controller.extend({
  stackSizes: function(){
    // var data = this.get()
    var data = this.get('model.chips').mapBy('seatsInfo').map(function(handSeats){

      //pluck(mapBy)
      return handSeats.mapBy('stackSize').reduce(function(sum, stackSize){
        // Number(stackSize) transforms stackSize from a string to a number
        return sum + Number(stackSize);
      }, 0);
    });

    // return {
    //   labels: Object.keys(data),
    //   series: [Ember.$.map(data, function(count){
    //     return count;
    //   })]
    // };

  }.property('model.chips.@each'),

  handCount: Ember.computed.alias('model.chips.length'),

  raisers: function(){
    // 1. get an array of arrays of preflopActions
    // 2. extract array of arrays of player names who have raised
    // 3. flatten (2) into a single array of names
    // 4. group names by count e.g. {person1: 5, person2: 6}
    var data = this.get('model.raises').mapBy('preflopActions').map(function(flopActions){

      flopActions = flopActions || [];
      return flopActions.filterBy('action', 'raises').mapBy('player');
    }).reduce(function(acc, raisers){
      return acc.concat(raisers);
    }, []).reduce(function(acc, raiser){
      acc[raiser] = acc[raiser] || 0;
      acc[raiser] += 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(data),
      series: [Ember.$.map(data, function(count){
        return count;
      })]
    };
  }.property('model.raises.@each'),

  actions: {
    saveComment: function() {
      var newComment = this.store.createRecord('comment', {
        body: this.get('newComment')
      });
      this.set('newComment', '');
      return newComment.save();
    },

    destroyComment: function(comment) {
      comment.destroy();
    },
  }

});
