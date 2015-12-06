import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {run} = Ember;

export default Ember.Object.extend({
  alive: false,
  neighbours: [],

  @computed('neighbours.@each.alive')
  aliveNeighboursCount(neighbours) {
    return neighbours.filter(alive => alive).get('length');
  },

  @computed('alive', 'aliveNeighboursCount')
  nextState(alive, aliveNeighboursCount) {
    return (alive && aliveNeighboursCount === 2) ||
      (aliveNeighboursCount === 3);
  },

  step() {
    const nextState = this.get('nextState');
    run.next(this, function() {
      this.set('alive', nextState);
    });
  }
});
