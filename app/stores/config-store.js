var AppDispatcher = require('../dispatcher/AppDispatcher'),
    assign = require('object-assign'),
    EventEmitter = require('events').EventEmitter;

var _config = {
  _currentFieldset: 'xAxis',
  title: 'This is a line chart',
  xAxis: '',
  yAxis: ''
},
CHANGE_EVENT = 'change';

function set(key, val) {
  _config[key] = val;
}

function setCurrentField(key) {
  _config._currentFieldset = key;
}


function setEditingInput(val) {
  _config[_config._currentFieldset] = val;
}

var ConfigStore = assign({}, EventEmitter.prototype, {
  getConfig: function () {
    return _config;
  },

  get: function (key) {
    return _config[key];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case 'grid_select_value':
      var val = action.config.toString();
      console.log(action.config);
      // Get current selected fieldset??
      setEditingInput(val);
      ConfigStore.emitChange();
      break;
    case 'form_input_modif':
      set(action.field.key, action.field.val);
      ConfigStore.emitChange();
      break;
    case 'form_set_current_edit_field':
      setCurrentField(action.key);
      ConfigStore.emitChange();
      break;
  }
});

module.exports = ConfigStore;
