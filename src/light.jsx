var React = require("react");

module.exports = React.createClass({
  clicked() {
    this.props.clickHandler(this.props.row, this.props.col);
  },

  render() {
    var classes="light ";
    classes += (this.props.lit) ? "light-lit" : "light-unlit";

    return (
      <span className={ classes } onClick={ this.clicked } />
    )
  }
});
