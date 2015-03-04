var React = require('react'),
    ConfigStore = require('../stores/config-store');

var Input = React.createClass({
  getInitialState: function() {
    return { value: '' };
  },
  componentDidMount: function() {
    ConfigStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ConfigStore.removeChangeListener(this._onChange);
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
    // New action? Store the new value inside config store?
  },

  _onChange: function () {
    this.setState({ value: ConfigStore.getXVal() });
  },

  render: function() {
    var value = this.state.value;
    return (
      <input id={this.props.id} type='text' value={value} onChange={this.handleChange} />
    );
  }
});

var Fieldset = React.createClass({
  handleClick: function (event) {
    console.log('event inside');
    console.log(event);
  },

  hand: function () {
    console.log('er');
  },

  render: function () {
    return (
      <div>
      <fieldset>
        <label htmlFor={this.props.id} onClick={this.hand}>{this.props.label}</label>
        <Input id={this.props.id} />
      </fieldset>
      </div>
    )
  }
});

var Config = React.createClass({
  // Use store to get all the config here
  // Then inside the config set a private _isSelected: 'key'
  // that will be used to set the correct value from the grid
  getInitialState: function () {
    return { currentFieldset: '' };
  },
  handleClick: function (event) {
    console.log('event config form');
    console.log(event);
  },
  render: function() {
    var boundClick = this.handleClick;
    return (
      <form className='config-form'>
        <Fieldset id='inputx' label='X' onClick={boundClick} />
        <Fieldset id='inputy' label='Y' onClick={boundClick} />
      </form>
    );
  }
});

module.exports = Config;
