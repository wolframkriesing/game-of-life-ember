import Ember from 'ember';

export default Ember.Component.extend({
  cell: 0,

  alive: Ember.computed('cell', function() {
    return this.get('cell') === 1;
  }),
});
