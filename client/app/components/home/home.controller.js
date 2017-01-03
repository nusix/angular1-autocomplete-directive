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

  selectCountry(item) {
    this.country = item.name;
    this.countries = [];

    console.log('HomeController -≥ selectCountry : Country was selected from auto-complete list item', item);
  }
}

export default HomeController;

/*
TODO MUST
5 - unit tests

6 - README file

8 - transfer as a directive

TODO COULD BE
3 - keyboard navigation

1 - spinners during loading
2 - showing letters in result
4 - validation input/change


*/