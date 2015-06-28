let React = require("react");

module.exports = React.createClass({
  render() {
    return (
      <p>
        <span>Moves: { this.props.moves }</span>
        <span> | </span>
        <span>
          <a onClick={ this.props.toggleSize }>
            { this.props.size }
            { String.fromCharCode(215) }
            { this.props.size }
          </a>
        </span>
        <span> | </span>
        <span><a onClick={ this.props.reset }>Reset</a></span>
      </p>
    )
  }
});
