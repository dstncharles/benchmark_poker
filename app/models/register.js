import DS from 'ember-data';

export default DS.Model.extend({
  destroy: function() {
    this.store.destroy('user', this);
  },

  save: function() {
    this.store.save("user", this);
  },

  toJSON: function() {
    return this;
  }

});
