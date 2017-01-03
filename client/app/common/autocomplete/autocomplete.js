import angular from 'angular';
import uiRouter from 'angular-ui-router';
import autocompleteComponent from './autocomplete.component';

let autocompleteModule = angular.module('autocomplete', [
  uiRouter
])

.component('autocomplete', autocompleteComponent)
  
.name;

export default autocompleteModule;
