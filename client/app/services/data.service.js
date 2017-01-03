export default class DataService {
  constructor($http) {
    this.$http = $http;
    this.url = 'https://restcountries.eu/rest/v1/name/';
  };

  //call http request for getting data from backend
  getDataFromBackend(city){
    // this.$http.get(this.url).then(function(res){
      console.log('DataService -≥ getDataFromBackend : Carousel data were loaded successfully for city:', city,'. Response:');
      // console.log('CarouselService -≥ getCarouselDataFromBackend : Carousel data were loaded successfully. Response:',res);
    //   successCbk(res);  
    // }, function (res) {
    //   console.error('CarouselService -≥ getCarouselDataFromBackend : There was an error during loading carousel data. Response:', res);
    //   errorCbk(res);  
    // });
  }
}

DataService.$inject = ['$http'];