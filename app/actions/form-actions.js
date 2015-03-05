var AppDispatcher = require('../dispatcher/AppDispatcher');

var FormActions = {
  input: function(key, val) {
    AppDispatcher.dispatch({
      actionType: 'form_input_modif',
      field: { key: key, val: val }
    });
  },

  setCurrentEditionField: function(key) {
    AppDispatcher.dispatch({
      actionType: 'form_set_current_edit_field',
      key: key
    });
  }
};

module.exports = FormActions;
