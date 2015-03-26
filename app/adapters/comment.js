import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Object.extend({
  findAll: function(name) {
    /* jshint unused: false */
    return ajax("https://api.parse.com/1/classes/Comment?include=createdBy").then(function(response){
      return response.results.map(function(comment) {
        comment.id = comment.objectId;
        delete comment.objectId;
        return comment;
      });
    });
  },

    save: function(type, record) {
  if (record.id) {
    return ajax({
      url: "https://api.parse.com/1/classes/Comment/" + record.id + "?include=createdBy",
      type: "PUT",
      data: JSON.stringify(record.toJSON())
    }).then(function(response) {
      record.updatedAt = response.updatedAt;
      return record;
    });

  } else {
    return ajax({
      url:  "https://api.parse.com/1/classes/Comment",
      type: "POST",
      data: JSON.stringify(record.toJSON())
    }).then(function(response) {
      record.id = response.objectId;
      record.createdAt = response.createdAt;
      return record;
    });
  }
},

  destroy: function(name, record) {
     /* jshint unused: false */
     return ajax({
       url: "https://api.parse.com/1/classes/Comment/" + record.id,
       type: "DELETE"
     });
   },


});
