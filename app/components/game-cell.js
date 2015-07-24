import Ember from 'ember';

export default Ember.Component.extend({
  cell: null,
  alive: Ember.computed.alias('cell.alive'),
});
