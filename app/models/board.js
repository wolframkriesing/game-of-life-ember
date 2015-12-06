import Cell from 'game-of-life/models/cell';

const wrapAround = function(index, length) {
  if (index === -1) {
    return length - 1;
  } else if (index === length) {
    return 0;
  } else {
    return index;
  }
};

export default class Board {

  _setupBoard() {
    const board = [
      [Cell.create(), Cell.create(), Cell.create(), Cell.create({alive:true}), Cell.create()],
      [Cell.create(), Cell.create(), Cell.create(), Cell.create(), Cell.create({alive:true})],
      [Cell.create(), Cell.create(), Cell.create({alive:true}), Cell.create({alive:true}), Cell.create({alive:true})],
      [Cell.create(), Cell.create(), Cell.create(), Cell.create(), Cell.create()],
      [Cell.create(), Cell.create(), Cell.create(), Cell.create(), Cell.create()]
    ];
    this._setNeighboursForCell(board);
    return board;
  }

  _setNeighboursForCell(board) {
    return board.map(function(row, row_index, board) {
      return row.map(function(cell, cell_index) {
        cell.neighbours = [
          board[wrapAround(row_index - 1, board.length)][wrapAround(cell_index - 1, row.length)],
          board[wrapAround(row_index - 1, board.length)][wrapAround(cell_index, row.length)],
          board[wrapAround(row_index - 1, board.length)][wrapAround(cell_index + 1, row.length)],
          board[wrapAround(row_index, board.length)][wrapAround(cell_index - 1, row.length)],
          board[wrapAround(row_index, board.length)][wrapAround(cell_index + 1, row.length)],
          board[wrapAround(row_index + 1, board.length)][wrapAround(cell_index - 1, row.length)],
          board[wrapAround(row_index + 1, board.length)][wrapAround(cell_index, row.length)],
          board[wrapAround(row_index + 1, board.length)][wrapAround(cell_index + 1, row.length)]
        ];
        return cell;
      });
    });
  }


}
