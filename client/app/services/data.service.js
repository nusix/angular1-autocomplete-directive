export default class DataService {
  constructor($http) {
    this.$http = $http;
    this.url = 'https://restcountries.eu/rest/v1/name/';
  };

  //call http request for getting data from backend
  getDataFromBackend(country){
    return this.$http.get(this.url + country);
  }
}

DataService.$inject = ['$http'];