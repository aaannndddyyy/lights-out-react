var Light = React.createClass({
  clicked: function() {
    this.props.clickHandler(this.props.row, this.props.col);
  },

  render: function() {
    var classes="light ";
    classes += (this.props.lit) ? "light-lit" : "light-unlit";

    return (
      <span className={ classes } onClick={ this.clicked } />
    )
  }
});

var Row = React.createClass({
  render: function() {
    var lights = [], light;

    for (var col = 0; col < this.props.lights.length; col++) {
      light = <Light
                lit={ this.props.lights[col] }
                row={ this.props.number }
                col={ col }
                clickHandler={ this.props.clickHandler } />;

      lights.push(light);
    }

    return (
      <div className="row">
        { lights }
      </div>
    );
  }
})

var VictoryButton = React.createClass({
  render: function() {
    return (
      <div className="victory-button" onClick={ this.props.clickHandler }>VICTORY</div>
    )
  }
});

var Board = React.createClass({
  getInitialState: function() {
    return {
      victory : false,
      data    : this.randomBoard(),
      moves   : 0
    }
  },

  reset: function() {
    this.setState({ victory: false, data: this.randomBoard(), moves: 0 });
  },

  buildBoard: function(cb) {
    var board = [];

    for (var row = 0; row < this.props.size; row++) {
      board.push([]);

      for (var col = 0; col < this.props.size; col++) {
        board[row].push(cb(board, row, col));
      }
    }

    return board;
  },

  randomBoard: function() {
    return this.buildBoard(function(board, row, col) {
      return Math.random() > 0.5;
    });
  },

  adjacent: function(row1, col1, row2, col2) {
    var rows = Math.abs(row1 - row2),
        cols = Math.abs(col1 - col2);

    return (rows == 0 && cols == 0)
        || (rows == 1 && cols == 0)
        || (rows == 0 && cols == 1);
  },

  lightClicked: function(row, col) {
    var oldData = this.state.data,
        toggle  = this.adjacent,
        victory = true,
        newData;

    newData = this.buildBoard(function(board, r, c) {
      var lit = oldData[r][c] ^ toggle(row, col, r, c);
      if (lit) { victory = false; }
      return lit;
    });

    if (victory) {
      this.setState({ victory: true, data: newData, moves: this.state.moves + 1 });
    } else {
      this.setState({ data: newData, moves: this.state.moves + 1 });
    }
  },

  render: function() {
    var rows    = [],
        classes = (this.state.victory) ? "victory" : "in-progress"

    for (var row = 0; row < this.props.size; row++) {
      rows.push(<Row
                  lights={ this.state.data[row] }
                  number={ row }
                  clickHandler={ (this.state.victory) ? this.reset : this.lightClicked } />);
    }

    return (
      <div className={ classes }>
        { rows }
        <span>Moves: { this.state.moves }</span>
        <VictoryButton clickHandler={ this.reset } />
      </div>
    );
  }
});

React.render(
  <Board size={ 3 } />,
  document.getElementById('content')
);
