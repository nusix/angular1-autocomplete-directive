class HomeController {
  constructor(dataService) {
    'ngInject';

    this.dataService = dataService;

    this.city = '';
  }

  loadCities() {
    this.dataService.getDataFromBackend(this.city);
  }
}

export default HomeController;

/*
TODO MUST
1 - request from server
2 - show list
3 - list absolute position
4 - validation
5 - unit tests
6 - README file
7 - mouse navigation

TODO COULD BE
1 - spinners during loading
2 - showing letters in result
3 - keyboard navigation


*/