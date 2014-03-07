// Generated by CoffeeScript 1.7.1
(function() {
  urlFor(function(url) {
    var authParams, config, container, fullURL, isLoggedIn, userController;
    container = Window.App.__container__;
    userController = container.lookup('controller:user');
    isLoggedIn = userController.get('isLoggedIn');
    authParams = $.param({
      Frontend_token: userController.get('token')
    });
    config = container.lookup('config:main');
    fullURL = "" + (config.get('host')) + (config.get('path')) + url;
    if (isLoggedIn) {
      fullURL += (url.indexOf("?") === -1 ? "?" : "&") + authParams;
    }
    return fullURL;
  });

  export default urlFor;

}).call(this);

//# sourceMappingURL=url_for.map
