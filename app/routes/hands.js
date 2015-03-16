import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return Ember.$.ajax("https://random-hands.herokuapp.com/hands/1").then(function(response) {
      console.log(response);
      return response.results;
    });
  }
});
