unhandledRejection = (reason) ->
  Ember.Logger.error reason
  Ember.Logger.assert reason

  setTimeout ->
    throw reason
  ,
    0
  return

`export default unhandledRejection`
