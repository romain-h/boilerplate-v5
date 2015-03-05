var Grid = require('./grid'),
  Visualisation = require('./visualisation'),
  Config = require('./config'),
  React = require('react'),
  request = require('request');

  function asyncFetch(file) {
    return new Promise((resolve, reject) => {
      request({
        json: true,
        method: 'GET',
        uri: 'http://devcoffy.com:9001/xls',
        withCredentials: false
      }, function (err, resp, body) {
        resolve(body[0].data);
      });
    });
  }

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

  componentDidMount: function () {
    var hash = window.location.hash;
    hash.slice(1);

    asyncFetch('1VHtmkmkBcvOSp_15vfGnletTAHQXYLs7OkxIo-lvD-Y').then(data => {
      this.setState({
        spreadsheetData: data
      });
    });
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
