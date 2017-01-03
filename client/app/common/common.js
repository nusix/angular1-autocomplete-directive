import angular from 'angular';
import Autocomplete from './autocomplete/autocomplete';

let commonModule = angular.module('app.common', [
  Autocomplete  
])
  
.name;

export default commonModule;
