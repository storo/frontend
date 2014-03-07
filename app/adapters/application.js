import getJSON from 'frontend/utils/get_json';
import ajax from 'frontend/utils/ajax';
import urlFor from 'frontend/utils/url_for';
import promiseStorage from 'frontend/utils/promise_storage';

var Adapter = Ember.Adapter.extend({
  find: function(record, id) {
    var self = this;

    // return promiseStorage.getItem('bug-' + id).then(function(value){
    //   if (value !== null) {
    //     record.load(id, value);

    //     return self._getJSON(id, {include_fields: "last_change_time"}).then(function(json) {
    //       if (json.error) { throw new Error(json.message); }

    //       if (json.bugs[0].last_change_time !== value.last_change_time) {
    //         self._loadFromServer(record, id);
    //       }
    //     });

    //   } else {
        return self._loadFromServer(record, id);
    //   }
    // });
  },

  // findMany: function(klass, records, ids) {
  //   var idParams = ids.map(function(id) { return "id=" + id; }).join('&');
  //   return this._getJSON("", idParams).then(function(data) {
  //     records.load(klass, data.bugs);
  //   });
  // },

  findQuery: function(klass, records, params) {
    this._getJSON("", params).then(function(data) {
      records.load(klass, data.bugs);
    });
  },

  createRecord: function(record) {
    var url = urlFor("bug");
    return ajax(url, {
      type: "POST",
      dataType: 'json',
      // contentType: 'application/json',
      data: record.toJSON()
    }).then(function(json) {
      // FIXME: EM should be able to load just an ID
      // https://github.com/ebryn/ember-model/issues/180
      record.set('id', json.id);
      record.didCreateRecord();
      record.set('id', json.id);
      record.reload();

      return record;
    }, function(err) {
      var xhr = err[0],
          json = xhr.responseJSON;
      alert(json.message); // TODO: better error handling

      throw err;
    });
  },

  saveRecord: function(record) {
    var url = urlFor("bug/" + record.get('id'));
    return ajax(url, {
      type: "PUT",
      dataType: 'json',
      // contentType: 'application/json',
      data: record.toJSON()
    }).then(function(json) {
      // FIXME: EM should be able to load just an ID
      record.set('id', json.id);
      record.didSaveRecord();
      record.set('id', json.id);
      // record.reload();

      return record;
    }, function(err) {
      var xhr = err[0],
          json = xhr.responseJSON;
      alert(json.message); // TODO: better error handling

      throw err;
    });
  },

  _getJSON: function(id, params) {
    return getJSON(urlFor("bug" + (id ? "/" + id : "")), params);
  },

  _loadFromServer: function(record, id) {
    return getJSON(urlFor("ember/show/" + id)).then(function(json) {
      var fields = json.fields, field, data = {};

      for(var i = 0, l = fields.length; i < l; i++) {
        field = fields[i];
        data[field.api_name] = field.current_value;
      }

      data.id = json.id;
      data.attachments = json.attachments;
      data.comments = json.comments;

      record.load(id, data);

      var fieldsByName = {}, customFields = [];
      json.fields.forEach(function(field) {
        if (field.is_custom) {
          customFields.push(field);
        } else {
          fieldsByName[field.name] = field;
        }
      });

      record.set('fields', fieldsByName);
      record.set('customFields', customFields);

      return record;
    });
  }
});

export default Adapter;