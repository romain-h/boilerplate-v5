var React = require('react');

var Visualisation = React.createClass({
  render: function () {
    var style = {
      float: 'left',
      color: 'red'
    };
    return <div className='visualisation' style={style}></div>;
  }
});

module.exports = Visualisation;
