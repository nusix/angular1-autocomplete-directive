class HomeController {
  constructor(dataService) {
    'ngInject';

    this.dataService = dataService;

    this.country = '';
    this.countries = [];
    this.selectedItemIndex = 0;
  }

  clearList() {
    this.countries = [];
    this.selectedItemIndex = 0;
  }

  loadCountries() {
    if(this.country.length > 0){
      this.dataService.getDataFromBackend(this.country)
      .then((res) => {
        this.countries = res.data;
        console.log('HomeController -≥ loadCities : Data were loaded successfully for country:', this.country,'. Response:', res);
      })
      .catch((res) => {
        console.error('HomeController -≥ loadCities : There was an error during loading data for country:', this.country,'. Response:', res);
      });
    }else{
      this.clearList();
    }
  }

  selectCountry(item) {
    this.country = item.name;
    this.clearList();

    console.log('HomeController -≥ selectCountry : Country was selected from auto-complete list item', item);
  }

  keyPressed(event) {
    var acceptedKeys = [13, 38, 40, 32, 39, 27];

    if(this.countries.length > 0 && acceptedKeys.indexOf(event.keyCode) !== -1){
      if(event.keyCode === 40){
        this.selectedItemIndex = (this.selectedItemIndex + 1) !==  this.countries.length ? this.selectedItemIndex + 1 : this.selectedItemIndex;
      }else if(event.keyCode === 38){
        this.selectedItemIndex = this.selectedItemIndex  !==  0 ? this.selectedItemIndex - 1 : this.selectedItemIndex;
      }else if(event.keyCode !== 27){
        this.selectCountry(this.countries[this.selectedItemIndex]);
      }else{
        this.clearList();
      }
    }
  }
}

export default HomeController;

/*
TODO MUST
1 - comments

8 - transfer as a directive

TODO COULD BE
1 - spinners during loading
2 - showing letters in result
4 - validation input/change


*/