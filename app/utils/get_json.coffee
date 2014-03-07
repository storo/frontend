getJSON = (url, params) ->
  args = arguments

  return new Ember.RSVP.Promise (resolve, reject) ->
    $.getJSON.apply($,args).then (json, status, xhr) ->
      if json.error
        xhr.then = null
        Ember.run null, reject, xhr
        return
      else
        Ember.run null, resolve, xhr
        return
    , (xhr) ->
      Ember.run null, reject, xhr
`export default getJSON`