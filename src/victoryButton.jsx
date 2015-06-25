var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <div className="victory-button" onClick={ this.props.clickHandler }>VICTORY</div>
    )
  }
});
