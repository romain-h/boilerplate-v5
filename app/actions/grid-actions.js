var AppDispatcher = require('../dispatcher/AppDispatcher');

var GridActions = {
  select: function(config) {
    AppDispatcher.dispatch({
      actionType: 'grid_select_value',
      config: config
    });
  }
};

module.exports = GridActions;
