let React         = require("react");
let Row           = require("./row");
let VictoryButton = require("./victoryButton");

module.exports = React.createClass({
  getInitialState() {
    return {
      size    : 3,
      victory : false,
      data    : this.randomBoard(3),
      moves   : 0
    }
  },

  reset() {
    this.setState({ victory: false, data: this.randomBoard(this.state.size), moves: 0 });
  },

  buildBoard(size, cb) {
    let board = [];

    for (let row = 0; row < size; row++) {
      board.push([]);

      for (let col = 0; col < size; col++) {
        board[row].push(cb(board, row, col));
      }
    }

    return board;
  },

  randomBoard(size) {
    return this.buildBoard(size, function(board, row, col) {
      return Math.random() > 0.5;
    });
  },

  adjacent(row1, col1, row2, col2) {
    let rows = Math.abs(row1 - row2),
        cols = Math.abs(col1 - col2);

    return (rows == 0 && cols == 0)
        || (rows == 1 && cols == 0)
        || (rows == 0 && cols == 1);
  },

  lightClicked(row, col) {
    let oldData = this.state.data,
        toggle  = this.adjacent,
        victory = true,
        newData;

    newData = this.buildBoard(this.state.size, function(board, r, c) {
      let lit = oldData[r][c] ^ toggle(row, col, r, c);
      if (lit) { victory = false; }
      return lit;
    });

    if (victory) {
      this.setState({ victory: true, data: newData, moves: this.state.moves + 1 });
    } else {
      this.setState({ data: newData, moves: this.state.moves + 1 });
    }
  },

  toggleSize() {
    let state = { victory: false, moves: 0 };
    state.size = (this.state.size == 3) ? 5 : 3;
    state.data = this.randomBoard(state.size);
    this.setState(state);
  },

  render() {
    let rows    = [],
        classes = (this.state.victory) ? "victory" : "in-progress"

    for (let row = 0; row < this.state.size; row++) {
      rows.push(<Row
                  lights={ this.state.data[row] }
                  number={ row }
                  clickHandler={ (this.state.victory) ? this.reset : this.lightClicked } />);
    }

    return (
      <div className={ classes }>
        { rows }
        <p>
          <span>Moves: { this.state.moves }</span>
          <span> | </span>
          <span><a onClick={ this.toggleSize }>{ this.state.size }{ String.fromCharCode(215) }{ this.state.size }</a></span>
          <span> | </span>
          <span><a onClick={ this.reset }>Reset</a></span>
        </p>

        <VictoryButton clickHandler={ this.reset } />
      </div>
    );
  }
});
