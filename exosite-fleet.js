require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"exosite-fleet":[function(require,module,exports){
module.exports=require('FXviCq');
},{}],"FXviCq":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _HttpJs = require('./Http.js');

var _HttpJs2 = _interopRequireDefault(_HttpJs);

/**
 * Exosite Fleet API Library
 * Copyright (c) Exosite | The MIT License
 */

var Exosite = (function () {
  function Exosite(userToken) {
    var apiServer = arguments.length <= 1 || arguments[1] === undefined ? 'https://fleet-prototype-api.herokuapp.com' : arguments[1];

    _classCallCheck(this, Exosite);

    this.http = new _HttpJs2['default'](userToken, apiServer);
  }

  /**
   * General query function for fleet API's query endpoints
   */

  _createClass(Exosite, [{
    key: 'q',
    value: function q(what, query, selection, options) {
      var data = {
        query: JSON.stringify(query)
      };
      if (selection) {
        data.select = selection.join(',');
      }
      if (options) {
        if (options.limit) {
          data.limit = options.limit;
        }
        if (options.sort) {
          data.sort = options.sort;
        }
      }

      return this.http.get('/api/v1/' + what, data);
    }
  }, {
    key: 'queryDevices',
    value: function queryDevices(query, selection, options) {
      return this.q('Devices', query, selection, options);
    }
  }, {
    key: 'queryUsers',
    value: function queryUsers(query, selection, options) {
      return this.q('Users', query, selection, options);
    }
  }, {
    key: 'rpc',
    value: function rpc(auth, calls) {
      return _HttpJs2['default'].post('/onep:v1/rpc/process', { auth: auth, calls: calls });
    }
  }]);

  return Exosite;
})();

exports['default'] = Exosite;
module.exports = exports['default'];

},{"./Http.js":3}],3:[function(require,module,exports){
/**
 * Make HTTP requests.
 * Copyright (c) Exosite | The MIT License
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Http = (function () {
  function Http(userToken, apiServer) {
    _classCallCheck(this, Http);

    this.apiServer = apiServer;
    // TODO: drop $ dependency
    $.ajaxSetup({
      beforeSend: function beforeSend(xhr) {
        if (userToken) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + userToken);
        }
      }
    });
  }

  _createClass(Http, [{
    key: 'get',
    value: function get(path, data) {
      var deferred = $.Deferred();
      var devices = $.ajax(this.apiServer + path, { data: data }).done(function (data) {
        deferred.resolve(data);
      }).fail(function (err) {
        deferred.reject(err);
      });
      return deferred.promise();
    }
  }, {
    key: 'post',
    value: function post(path, data) {
      var deferred = $.Deferred();
      results = $.ajax(this.API_SERVER + path, {
        type: 'POST',
        processData: false,
        contentType: 'application/json',
        data: JSON.stringify(data)
      }).done(function (response) {
        deferred.resolve(response);
      }).fail(function (err) {
        deferred.reject(err);
      });

      return deferred.promise();
    }
  }]);

  return Http;
})();

exports['default'] = Http;
module.exports = exports['default'];

},{}]},{},["FXviCq"])