var app = app || {};
(function () {
  var ESCAPE_KEY = 27;
  var ENTER_KEY = 13;
  app.TodoItem = React.createClass({
    handleSubmit: function (event) {
      var val = this.state.editText.trim();
      if(val){
        this.props.onSave(val);
        this.setState({
          editText: val
        });
      } else {

      }
    }
  })
})();