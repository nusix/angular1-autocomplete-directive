export default class DataService {
  constructor($http) {
    this.$http = $http;
    this.url = 'https://restcountries.eu/rest/v1/name/';    //url of REST API
  };

  //call http request for getting data from backend after on change from input
  getDataFromBackend(country){
    return this.$http.get(this.url + country);
  }
}

DataService.$inject = ['$http'];