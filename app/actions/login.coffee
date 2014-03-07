
`import getJSON from 'frontend/utils/get_json'`
`import ajax from 'frontend/utils/ajax'`
`import urlFor from 'frontend/utils/url_for'`

login = (username, password) ->
  container = Window.App.__container__
  config = container.lookup('config:main')
  params =
    data:
      password: password
      username_type: 'email'
      grant_type: 'password'
      client_id: config.get('client_id')
      client_secret: config.get('client_secret')
    type: 'POST'
    dataType: 'json'
    crossDomain: true

  ajax urlFor('auth/token'), params

`export default login`
  