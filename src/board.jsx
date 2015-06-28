let React         = require("react");
let Menu          = require("./menu");
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
    this.setState({
      victory : false,
      data    : this.randomBoard(this.state.size),
      moves   : 0
    });
  },

  buildBoard(size, cb) {
    let board = [];

    for (let row = 0; row < size; row++) {
      board.push([]);

      for (let col = 0; col < size; col++) {
        board[row].push(cb(row, col));
      }
    }

    return board;
  },

  applyMove(board, row, col, cb = lit => {}) {
    let adjacent = function(r, c) {
      let rows = Math.abs(row - r),
          cols = Math.abs(col - c);

      return (rows == 0 && cols == 0)
          || (rows == 1 && cols == 0)
          || (rows == 0 && cols == 1);
    };

    return this.buildBoard(board.length, function(r, c) {
      let lit = board[r][c] ^ adjacent(r, c);
      cb(lit);
      return lit;
    });
  },

  randomBoard(size) {
    let board    = this.buildBoard(size, (r, c) => false),
        randMove = () => Math.floor(Math.random() * size),
        iters    = Math.floor(Math.random() * 100);

    for (let iter = 0; iter < iters; iter++) {
      board = this.applyMove(board, randMove(), randMove());
    }

    return board;
  },

  lightClicked(row, col) {
    let victory = true;

    this.setState({
      data    : this.applyMove(this.state.data, row, col, lit => { if (lit) victory = false }),
      victory : victory,
      moves   : this.state.moves + 1
    });
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

        <Menu
          moves={ this.state.moves }
          size={ this.state.size }
          toggleSize={ this.toggleSize }
          reset={ this.reset } />

        <VictoryButton clickHandler={ this.reset } />
      </div>
    );
  }
});
