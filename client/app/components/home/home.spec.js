import HomeModule from './home'
import DataService from '../../services/data.service';
import homeController from './home.controller';

describe('Home', () => {
  let $rootScope, $state, $location, $componentController, $compile, HomeController, dataService, $httpBackend,
      urlBackend, succDataBackend;

  beforeEach(window.module(HomeModule));

  beforeEach(inject(($injector, $http, _$httpBackend_) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');

    dataService = new DataService($http);
    HomeController = new homeController(dataService);
    
    $httpBackend = _$httpBackend_;
    urlBackend = 'https://restcountries.eu/rest/v1/name/';
    succDataBackend = [{id: 0,name: "dummy"}];
  }));

  describe('Module', () => {
    it('default component should be home', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).toEqual('home');
    });
  });

  describe('Controller', () => {
    it('testing init properties and values', () => {
      expect(HomeController.country).toBeDefined();
      expect(HomeController.countries).toBeDefined();
      expect(HomeController.selectCountry).toBeDefined();
      expect(HomeController.loadCountries).toBeDefined();
      expect(HomeController.selectedItemIndex).toBeDefined();

      expect(HomeController.country).toEqual('');
      expect(HomeController.countries.length).toEqual(0);
    });

    it('testing loadCountries() error', () => { 
      HomeController.country = 'dum';
      expect(HomeController.countries.length).toEqual(0);

      //error request from backend
      $httpBackend.when('GET', urlBackend + HomeController.country).respond(404, {});
      HomeController.loadCountries();
      $httpBackend.flush();
      expect(HomeController.countries.length).toEqual(0);
    });

    it('testing loadCountries() success', () => { 
      HomeController.country = 'dum';
      expect(HomeController.countries.length).toEqual(0);

      //success request from backend
      $httpBackend.when('GET', urlBackend + HomeController.country).respond(200, succDataBackend);
      HomeController.loadCountries();
      $httpBackend.flush();

      expect(HomeController.countries.length).toEqual(1);
      expect(HomeController.countries[0].name).toEqual('dummy');

      //checking empty string from input - list should be cleared (autocomplete will be hidden)
      HomeController.country = '';
      HomeController.loadCountries();
      expect(HomeController.countries.length).toEqual(0);
    });

    it('testing selectCountry(item)', () => { 
      expect(HomeController.country).toEqual('');
      expect(HomeController.countries.length).toEqual(0);

      var dummyItem = {name : 'Slovakia'};
      HomeController.countries.push(dummyItem);
      expect(HomeController.countries.length).toEqual(1);

      //item should be selected and name should be in input field
      HomeController.selectCountry(dummyItem);
      expect(HomeController.countries.length).toEqual(0);
      expect(HomeController.country).toEqual(dummyItem.name);
    });

    it('testing keyPressed()', () => { 
      var dummyItem = {name : 'Slovakia'},
          dummyItem2 = {name : 'Slovakia2'};

      HomeController.countries.push(dummyItem);
      HomeController.countries.push(dummyItem2);

      //not accepted key code
      expect(HomeController.selectedItemIndex).toEqual(0);
      HomeController.keyPressed({keyCode : 66});
      expect(HomeController.selectedItemIndex).toEqual(0);

      //arrow down - next should be selected
      HomeController.keyPressed({keyCode : 40});
      expect(HomeController.selectedItemIndex).toEqual(1);

      //again arrow down - same item as it is last in a list
      HomeController.keyPressed({keyCode : 40});
      expect(HomeController.selectedItemIndex).toEqual(1);

      //again arrow up - previous item should be selected
      HomeController.keyPressed({keyCode : 38});
      expect(HomeController.selectedItemIndex).toEqual(0);

      //again arrow up - same item as it is first in a list
      HomeController.keyPressed({keyCode : 38});
      expect(HomeController.selectedItemIndex).toEqual(0);

      //again down to next (last) item
      HomeController.keyPressed({keyCode : 40});
      expect(HomeController.selectedItemIndex).toEqual(1);
      //enter key for selecting this item
      HomeController.keyPressed({keyCode : 13});
      expect(HomeController.country).toEqual(dummyItem2.name);
      //list afer selecting is cleared
      expect(HomeController.countries.length).toEqual(0);

      HomeController.countries.push(dummyItem);
      HomeController.countries.push(dummyItem2);
      //escape key for closing auutocomplete - list is cleared
      HomeController.keyPressed({keyCode : 27});
      expect(HomeController.countries.length).toEqual(0);
    });
  });
});