(function() {
  'use strict';

  angular.module('app')
    .controller('ContactsCtrl', ContactsCtrl);

  ContactsCtrl.$inject = ['contacts', '$log', 'filterFilter'];

  function ContactsCtrl(contacts, $log, filterFilter) {
    var vm = this;
    vm.contacts = [];
    vm.sortColumns = [
            {name:'Name', value:'first_name'},
            {name:'Surname' ,value:'last_name'},
            {name:'Email' ,value:'email'},
            {name:'Phone' ,value:'phone'},
            {name:'Company' ,value:'company'},
            {name:'Date of birth',value:'birth_date'}
        ];
    vm.orderByColumn = vm.sortColumns[0];
    vm.optItemsPerPage = [10, 20, 50];

    activate();

    function activate() {
      vm.contacts = contacts.all();
      vm.totalItems = vm.contacts.length;
      vm.currentPage = 1;
      vm.itemsPerPage = vm.optItemsPerPage[0];

    }

    vm.setTotalItems = setTotalItems;

    function setTotalItems() {
      vm.contacts = filterFilter(contacts.all(), vm.search)
      vm.totalItems = vm.contacts.length;
    }

  }
})();