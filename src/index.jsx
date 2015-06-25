var React = require("react");
var Board = require("./board");

React.render(
  <Board size={ 3 } />,
  document.getElementById('content')
);
