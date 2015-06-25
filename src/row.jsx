var React = require("react");
var Light = require("./light");

module.exports = React.createClass({
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
});
