import AutocompleteModule from './autocomplete'
import AutocompleteController from './autocomplete.controller';
import AutocompleteComponent from './autocomplete.component';
import AutocompleteTemplate from './autocomplete.html';
import DataService from '../../services/data.service';

describe('Autocomplete', () => {
  let $rootScope, $scope, $state, $location, $componentController, $compile, autocompleteController, dataService, $httpBackend,
      urlBackend, succDataBackend;

  beforeEach(window.module(AutocompleteModule));
 
  beforeEach(inject(($injector, $http, _$httpBackend_) => {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');

    dataService = new DataService($http);
    autocompleteController = new AutocompleteController(dataService, $scope);

    $httpBackend = _$httpBackend_;
    urlBackend = 'https://restcountries.eu/rest/v1/name/';
    succDataBackend = [{id: 0,name: "dummy"}];
  }));

  describe('Controller', () => {
    it('testing init properties and values', () => {
      expect(autocompleteController.country).toBeDefined();
      expect(autocompleteController.countries).toBeDefined();
      expect(autocompleteController.selectCountry).toBeDefined();
      expect(autocompleteController.loadCountries).toBeDefined();
      expect(autocompleteController.selectedItemIndex).toBeDefined();

      expect(autocompleteController.country).toEqual('');
      expect(autocompleteController.countries.length).toEqual(0);
    });

    it('testing loadCountries() error', () => { 
      autocompleteController.country = 'dum';
      expect(autocompleteController.countries.length).toEqual(0);

      //error request from backend
      $httpBackend.when('GET', urlBackend + autocompleteController.country).respond(404, {});
      autocompleteController.loadCountries();
      $httpBackend.flush();
      expect(autocompleteController.countries.length).toEqual(0);
    });

    it('testing loadCountries() success', () => { 
      autocompleteController.country = 'dum';
      expect(autocompleteController.countries.length).toEqual(0);

      //success request from backend
      $httpBackend.when('GET', urlBackend + autocompleteController.country).respond(200, succDataBackend);
      autocompleteController.loadCountries();
      $httpBackend.flush();

      expect(autocompleteController.countries.length).toEqual(1);
      expect(autocompleteController.countries[0].name).toEqual('dummy');

      //checking empty string from input - list should be cleared (autocomplete will be hidden)
      autocompleteController.country = '';
      autocompleteController.loadCountries();
      expect(autocompleteController.countries.length).toEqual(0);
    });

    it('testing selectCountry(item)', () => { 
      expect(autocompleteController.country).toEqual('');
      expect(autocompleteController.countries.length).toEqual(0);

      var dummyItem = {name : 'Slovakia'};
      autocompleteController.countries.push(dummyItem);
      expect(autocompleteController.countries.length).toEqual(1);

      //item should be selected and name should be in input field
      autocompleteController.selectCountry(dummyItem);
      expect(autocompleteController.countries.length).toEqual(0);
      expect(autocompleteController.country).toEqual(dummyItem.name);
    });

    it('testing keyPressed()', () => { 
      var dummyItem = {name : 'Slovakia'},
          dummyItem2 = {name : 'Slovakia2'};

      autocompleteController.countries.push(dummyItem);
      autocompleteController.countries.push(dummyItem2);

      //not accepted key code
      expect(autocompleteController.selectedItemIndex).toEqual(0);
      autocompleteController.keyPressed({keyCode : 66});
      expect(autocompleteController.selectedItemIndex).toEqual(0);

      //arrow down - next should be selected
      autocompleteController.keyPressed({keyCode : 40});
      expect(autocompleteController.selectedItemIndex).toEqual(1);

      //again arrow down - same item as it is last in a list
      autocompleteController.keyPressed({keyCode : 40});
      expect(autocompleteController.selectedItemIndex).toEqual(1);

      //again arrow up - previous item should be selected
      autocompleteController.keyPressed({keyCode : 38});
      expect(autocompleteController.selectedItemIndex).toEqual(0);

      //again arrow up - same item as it is first in a list
      autocompleteController.keyPressed({keyCode : 38});
      expect(autocompleteController.selectedItemIndex).toEqual(0);

      //again down to next (last) item
      autocompleteController.keyPressed({keyCode : 40});
      expect(autocompleteController.selectedItemIndex).toEqual(1);
      //enter key for selecting this item
      autocompleteController.keyPressed({keyCode : 13});
      expect(autocompleteController.country).toEqual(dummyItem2.name);
      //list afer selecting is cleared
      expect(autocompleteController.countries.length).toEqual(0);

      autocompleteController.countries.push(dummyItem);
      autocompleteController.countries.push(dummyItem2);
      //escape key for closing auutocomplete - list is cleared
      autocompleteController.keyPressed({keyCode : 27});
      expect(autocompleteController.countries.length).toEqual(0);
    });
  });
});