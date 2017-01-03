class HomeController {
  constructor($scope) {
    'ngInject';
    this.chosenCountry = '';
    

    $scope.$on('country-selected', (event, args) => {
      this.chosenCountry = args.country;
    });
  }
}

export default HomeController;

/*
TODO later
  2 - spinners during loading
  3 - highlighting used letters in result items in a list
  4 - validation input/change
*/