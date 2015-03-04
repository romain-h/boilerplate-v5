'use strict';

var React = require('react'),
    GridActions = require('../actions/grid-actions'),
    Handsontable = require('handsontable');

var ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');
var customBorders = [
    {
      range: {
        from: {
          row: 1,
          col: 1
        },
        to: {
          row: 3,
          col: 4
        }
      },
      top: {
        width: 2,
        color: '#5292F7'
      },
      left: {
        width: 2,
        color: 'orange'
      },
      bottom: {
        width: 2,
        color: 'red'
      },
      right: {
        width: 2,
        color: 'magenta'
      }
    }];

var Grid = React.createClass({
  getInitialState: function () {
    return {
      spreadsheetData: this.props.spreadsheetData
    };
  },

  afterSelection: function (r, c, r2, c2) {
    console.log(arguments);
    var val;
    this.gridEditor.updateSettings({
      customBorders: customBorders
    });
    if (r === r2 && c === c2) {
      c = ALPHABET[c];
      r++;
      val =`${c}${r}`;
    } else {
      c = ALPHABET[c], c2 = ALPHABET[c2],
      r++, r2++;
      val = `${c}${r}:${c2}${r2}`;
    }
    GridActions.select(val);
  },

  installGridEditor: function () {
    var el = this.getDOMNode();

    this.gridEditor = new Handsontable(el, {
      data: this.state.spreadsheetData,
      colHeaders: true,
      rowHeaders: true,
      minSpareRows: 1,
      contextMenu: true,
      afterSelection: this.afterSelection
    });
  },

  componentDidMount: function () {
    if (!this.gridEditor) {
      this.installGridEditor();
    }
  },

  render: function () {
    console.log(this.props);
    return <div className='grid-edition'></div>;
  }
});

module.exports = Grid;
