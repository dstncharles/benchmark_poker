import Ember from 'ember';
import layout from '../templates/components/x-login';

export default Ember.Component.extend({
  layout: layout,

  actions: {
  toggle:(function() {
    this.$("#modal-1").on("change", function() {
      if (this.$(this).is(":checked")) {
        this.$("toggle").addClass("modal-open");
      } else {
        this.$("toggle").removeClass("modal-open");
      }
    });

    this.$(".modal-window").on("click", function() {
      this.$(".modal-state:checked").prop("checked", false).change();
    });

    this.$(".modal-inner").on("click", function(e) {
      e.stopPropagation();
    });
  })
}
});
