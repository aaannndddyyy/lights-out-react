let React = require("react");

module.exports = React.createClass({
  render() {
    return (
      <div className="victory-button" onClick={ this.props.clickHandler }>VICTORY</div>
    )
  }
});
