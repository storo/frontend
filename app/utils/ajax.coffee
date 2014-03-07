ajax = (url, params) ->
  args = arguments
  return new Ember.RSVP.Promise = (resolve, reject) ->
    $.ajax.apply($, args).then( json, status, xhr) ->
      if json.error
        xhr.then = null;
        Ember.run(null, reject, xhr)
        return
      else
        Ember.run(null, resolve, json);
        return
    , (xhr) ->
      Ember.run(null, reject, xhr);
      return
    return

`export default ajax`