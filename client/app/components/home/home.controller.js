class HomeController {
  constructor(dataService) {
    'ngInject';

    this.dataService = dataService;

    this.country = '';
    this.countries = [];
  }

  loadCountries() {
    this.dataService.getDataFromBackend(this.country)
    .then((res) => {
      this.countries = res.data;
      console.log('HomeController -≥ loadCities : Data were loaded successfully for country:', this.country,'. Response:', res);
    })
    .catch((res) => {
      console.error('HomeController -≥ loadCities : There was an error during loading data for country:', this.country,'. Response:', res);
    });
  }
}

export default HomeController;

/*
TODO MUST
7 - mouse navigation and selecting

4 - validation

5 - unit tests
6 - README file

8 - transfer as a directive

TODO COULD BE
1 - spinners during loading
2 - showing letters in result
3 - keyboard navigation


*/