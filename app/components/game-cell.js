import Ember from 'ember';
const {run, computed} = Ember;

export default Ember.Component.extend({
  cell: null,
  alive: computed.alias('cell.alive'),

  click() {
    run.next(this, function() {
      this.toggleProperty('alive');
    });
  },
});
