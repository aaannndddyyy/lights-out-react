var React = require("react");

module.exports = React.createClass({
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
