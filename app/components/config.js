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
    return (
      <input id={this.props.id} type='text' value={this.state.value} onChange={this.handleChange} />
    );
  }
});

var FormGroup = React.createClass({
  handleClick: function (event) {
    console.log('event inside');
    console.log(event);
  },

  hand: function () {
    console.log('er');
  },

  render: function () {
    return (
      <div className='form-group'>
        <label htmlFor={this.props.id} onClick={this.hand}>{this.props.label}</label>
        <Input id={this.props.id} />
      </div>
    )
  }
});

var Config = React.createClass({
  // Use store to get all the config here
  // Then inside the config set a private _isSelected: 'key'
  // that will be used to set the correct value from the grid
  getInitialState: function () {
    return {
      currentFieldset: '',
      title: 'This is a line chart'
    };
  },
  handleClick: function (event) {
    console.log('event config form');
    console.log(event);
  },
  render: function() {
    var boundClick = this.handleClick,
    style = {
      float: 'left',
      width: '350px',
      marginRight: '40px'
    };
    return (
      <div>
        <form className='config-form'>
          <FormGroup id='title' label='Title' initVal={this.state.title} />
          <FormGroup id='inputx' label='x-axis' onClick={boundClick} />
          <FormGroup id='inputy' label='y-axis' onClick={boundClick} />
        </form>
        <div style={style}>
          <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
        </div>
      </div>
    );
  }
});

module.exports = Config;
