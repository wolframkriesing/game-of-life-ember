import Ember from 'ember';

const wrapAround = function(index, length) {
  if (index === -1) {
    return length - 1;
  } else if (index === length) {
    return 0;
  } else {
    return index;
  }
};

export default Ember.Controller.extend({
  playing: false,
  board: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],

  future: Ember.computed('board.@each', function() {
    return this.get('board').map(function(row, row_index, board) {
      return row.map(function(cell, cell_index) {
        const neighbours = [
          board[wrapAround(row_index - 1, board.length)][wrapAround(cell_index - 1, row.length)],
          board[wrapAround(row_index - 1, board.length)][wrapAround(cell_index, row.length)],
          board[wrapAround(row_index - 1, board.length)][wrapAround(cell_index + 1, row.length)],
          board[wrapAround(row_index, board.length)][wrapAround(cell_index - 1, row.length)],
          board[wrapAround(row_index, board.length)][wrapAround(cell_index + 1, row.length)],
          board[wrapAround(row_index + 1, board.length)][wrapAround(cell_index - 1, row.length)],
          board[wrapAround(row_index + 1, board.length)][wrapAround(cell_index, row.length)],
          board[wrapAround(row_index + 1, board.length)][wrapAround(cell_index + 1, row.length)]
        ];

        const neighboursCount = neighbours.reduce(function(total, neighbour) {
          return total + neighbour;
        }, 0);

        if (cell && neighboursCount == 2) {
          return 1;
        } else if (neighboursCount == 3) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }),

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
    },
  },

  _step(shouldRepeat) {
    const future = this.get('future');
    this.set('board', future);
    if (shouldRepeat) {
      this.set('runLater', Ember.run.later(this, this._step, true, 100));
    }
  }
});
