var React = require('react'),
    ConfigStore = require('../stores/config-store'),
    FormActions = require('../actions/form-actions');

var Input = React.createClass({
  getInitialState: function () {
    return { val: this.props.val };
  },

  _onChange: function () {
    this.setState({ val: ConfigStore.get(this.props.id) });
  },

  componentDidMount: function() {
    ConfigStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ConfigStore.removeChangeListener(this._onChange);
  },

  handleChange: function(event) {
    var newVal = event.target.value;
    this.setState({ val: newVal });
    FormActions.input(this.props.id, newVal);
  },
  render: function() {
    return (
      <input id={this.props.id} type='text' value={this.state.val} onChange={this.handleChange} />
    );
  }
});

var FormGroup = React.createClass({
  handleClick: function () {
    // TODO if editable by select....
    FormActions.setCurrentEditionField(this.props.id);
  },
  render: function () {
    return (
      <div className='form-group' onClick={this.handleClick} >
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <Input id={this.props.id} val={this.props.val} />
      </div>
    )
  }
});

var Config = React.createClass({
  getInitialState: function () {
    return ConfigStore.getConfig();
  },

  _onChange: function () {
    this.setState(ConfigStore.getConfig());
  },

  componentDidMount: function() {
    ConfigStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ConfigStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var style = {
      float: 'left',
      width: '350px',
      marginRight: '40px'
    };
    return (
      <div>
        <form className='config-form'>
          <FormGroup id='title' label='Title' val={this.state.title} />
          <FormGroup id='xAxis' label='x-axis' val={this.state.xAxis} />
          <FormGroup id='yAxis' label='y-axis' val={this.state.yAxis} />
        </form>
        <div style={style}>
          <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
        </div>
      </div>
    );
  }
});

module.exports = Config;
