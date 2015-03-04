var AppDispatcher = require('../dispatcher/AppDispatcher'),
    assign = require('object-assign'),
    EventEmitter = require('events').EventEmitter;

var _config = {},
  CHANGE_EVENT = 'change';

function setX(val) {
  _config.x = val;
}

var ConfigStore = assign({}, EventEmitter.prototype, {
  getXVal: function () {
    return _config.x;
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
      setX(val);
      ConfigStore.emitChange();
      break;
  }
});

module.exports = ConfigStore;
