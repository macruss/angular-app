(function() {
  'use strict';

  angular.module('app')
    .service('contacts', contacts);

  contacts.$inject = ['$http'];

  function contacts($http) {

    var contacts = CONTACTS_FILE;

    return {
      all: all,
      get: get,
      update: update,
      add: add
    };

      // function all() {
      //   return contacts;
      // }

      // function get(id) {
      //   var contact = null;
      //   angular.forEach(contacts, function(value) {
      //     if (value.id === +id)
      //       contact = value;
      //   });
      //   return contact;
      // }

      // function update(contact) {
      //   angular.forEach(contacts, function(value) {
      //     if (value.id === contact.id )
      //       value = contact;
      //   });
      // }

      // function add(contact) {
      //       contact.id = contacts.length + 1;
      //       console.log(contact);
      //       contacts.push(contact);
      // }

    function all() {
      return $http.get('/api/contacts')
        .then(allComplete)
        .catch(allFailed);

      function allComplete(respons) {
        return respons.data;
        }

      function allFailed(error) {
        console.log('XHR Failed for contacts ' + error.data);
      }
    }

    function get(id) {
      return $http.get('/api/contacts/' + id)
        .then(getComplete)
        .catch(getFailed);

      function getComplete(respons) {
        // console.log(respons);
        return respons.data[0];
      };


      function getFailed(error) {
        console.log('XHR Failed for contacts ' + error.data);
      }
    }

    function update(contact) {
      return $http.put('/api/contacts/' + contact._id, contact)
        .then(updateComplete)
        .catch(updateFailed);

      function updateComplete(respons) {
        return respons.status;
        console.log(respons.status);
      }

      function updateFailed(error) {
        console.log('XHR Failed for contact ' + error.data);
      }
    }

    function add(contact) {
      return $http.post('/api/contacts', contact)
        .then(addComplete)
        .catch(addFailed);

      function addComplete(respons) {
        return respons.status;
        console.log(respons.status);
      }

      function addFailed(error) {
        console.log('XHR Failed for contact ' + error.data);
      }
    }
  };
})();