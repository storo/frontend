var UserController = Ember.Controller.extend({
  username: function(key, value) {
    if (arguments.length === 2) {
      if (value === null) {
        delete sessionStorage.username;
      } else {
        sessionStorage.username = value;
      }
      return value;
    }
    return sessionStorage.username;
  }.property(),

  token: function(key, value) {
    if (arguments.length === 2) {
      if (value === null) {
        delete sessionStorage.token;
      } else {
        sessionStorage.token = value;
      }
      return value;
    }
    return sessionStorage.token;
  }.property(),

  isLoggedIn: function(key, value) {
    if (arguments.length === 2) { return value; }
    return !!this.get('token');
  }.property('token'),


  willDestroy: function() {
    delete sessionStorage.token;
  }
});

export default UserController;
