import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Object.extend({
  findAll: function(name) {
    /* jshint unused: false */
    return ajax("https://api.parse.com/1/classes/Comment").then(function(response){
      return response.results.map(function(comment) {
        comment.id = comment.objectId;
        delete comment.objectId;
        return comment;
      });
    });
  },

  save: function(){

  }
});
