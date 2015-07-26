import Ember from 'ember';

const {run, computed} = Ember;

export default Ember.Object.extend({
  alive: false,
  neighbours: [],
  aliveNeighboursCount: computed('neighbours.@each.alive', function() {
    return this.get('neighbours').filterBy('alive', true).get('length');
  }),

  nextState: computed('alive', 'aliveNeighboursCount', function() {
    const {alive, aliveNeighboursCount} =
      this.getProperties('alive', 'aliveNeighboursCount');

    return (alive && aliveNeighboursCount === 2) ||
      (aliveNeighboursCount === 3);
  }),

  step() {
    const nextState = this.get('nextState');

    run.next(this, function() {
      this.set('alive', nextState);
    });
  },
});
