var Light = React.createClass({
  render: function() {
    return (
      <li>Light</li>
    )
  }  
});

var Board = React.createClass({
  render: function() {
    return (
      <div>
        <p>Grid</p>

        <ul>
          <Light /> 
          <Light /> 
          <Light /> 
          <Light /> 
          <Light /> 
          <Light /> 
          <Light /> 
          <Light /> 
          <Light /> 
        </ul>
      </div>
    );
  }
});

React.render(
  <Board />,
  document.getElementById('content')
);
