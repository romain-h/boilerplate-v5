var Grid = require('./grid'),
  Visualisation = require('./visualisation'),
  Config = require('./config'),
  React = require('react');

var App = React.createClass({
  getInitialState: function () {
    return {
      spreadsheetData: [
        ['', 'Kia', 'Nissan', 'Toyota', 'Honda'],
        ['2008', 10, 11, 12, 13],
        ['2009', 20, 11, 14, 13],
        ['2009', 30, 15, 12, 13]
      ]
    };
  },
  render: function () {
    return (
      <div className='app-wrapper'>
       <Config />
       <Grid spreadsheetData={this.state.spreadsheetData} />
       <Visualisation />
      </div>
    );
  }
});

module.exports = App;
