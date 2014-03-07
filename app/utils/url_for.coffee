urlFor (url) ->
  container = Window.App.__container__
  userController = container.lookup 'controller:user'
  isLoggedIn = userController.get 'isLoggedIn'
  authParams = $.param
    Frontend_token: userController.get 'token'
  config = container.lookup 'config:main'
  fullURL = "#{config.get 'host'}#{config.get 'path'}#{url}"

  if isLoggedIn
    fullURL += ((if url.indexOf("?") is -1 then "?" else "&")) + authParams
  return fullURL
`export default urlFor`
