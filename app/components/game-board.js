import Ember from 'ember';
import Cell from 'game-of-life/models/cell';
import computed from 'ember-computed-decorators';

const wrapAround = function(index, length) {
  if (index === -1) {
    return length - 1;
  } else if (index === length) {
    return 0;
  } else {
    return index;
  }
};

export default Ember.Component.extend({
  playing: false,

  @computed('width', 'height')
  board() {
    const board = this._setupBoard();
    this._registerNeighbours(board);

    return board;
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
    board.forEach(function(row) {
      row.invoke('step');
    });
    if (shouldRepeat) {
      this.set('runLater', Ember.run.next(this, this._step, true));
    }
  },

  _setupBoard() {
    const width=10, height=10;
    const board = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const alive = Math.random() < 0.5;
        row.pushObject(Cell.create({alive}));
      }
      board.pushObject(row);
    }

    return board;
  },

  _registerNeighbours(board) {
    return board.map(function(row, row_index, board) {
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

        cell.set('neighbours', neighbours);
        return cell;
      });
    });
  },
});
