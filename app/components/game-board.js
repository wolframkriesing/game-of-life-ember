import Ember from 'ember';
import Board from 'game-of-life/models/board';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  playing: false,

  @computed('width', 'height')
  board() {
    return new Board()._setupBoard();
  },

  actions: {
    step() {
      this._step();
    },

    play() {
      this.set('playing', true);
      this._step(true);
    },

    pause() {
      this.set('playing', false);
      Ember.run.cancel(this.get('runLater'));
    }
  },

  _step(shouldRepeat) {
    const board = this.get('board');

    // calculate next generation
    board.forEach(function(row) {
      row.forEach(cell => cell.step())
    });

    if (shouldRepeat) {
      this.set('runLater', Ember.run.next(this, this._step, true));
    }
  }

});
