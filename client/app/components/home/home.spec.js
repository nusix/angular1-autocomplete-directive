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
    // top-level specs: i.e., routes, injection, naming
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

      //error
      $httpBackend.when('GET', urlBackend + HomeController.country).respond(404, {});
      HomeController.loadCountries();
      $httpBackend.flush();
      expect(HomeController.countries.length).toEqual(0);
    });

    it('testing loadCountries() success', () => { 
      HomeController.country = 'dum';
      expect(HomeController.countries.length).toEqual(0);

      //success
      $httpBackend.when('GET', urlBackend + HomeController.country).respond(200, succDataBackend);
      HomeController.loadCountries();
      $httpBackend.flush();

      expect(HomeController.countries.length).toEqual(1);
      expect(HomeController.countries[0].name).toEqual('dummy');

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

      HomeController.selectCountry(dummyItem);
      expect(HomeController.countries.length).toEqual(0);
      expect(HomeController.country).toEqual(dummyItem.name);
    });

    it('testing keyPressed()', () => { 
      var dummyItem = {name : 'Slovakia'},
          dummyItem2 = {name : 'Slovakia2'};

      HomeController.countries.push(dummyItem);
      HomeController.countries.push(dummyItem2);

      expect(HomeController.selectedItemIndex).toEqual(0);
      HomeController.keyPressed({keyCode : 66});
      expect(HomeController.selectedItemIndex).toEqual(0);

      HomeController.keyPressed({keyCode : 40});
      expect(HomeController.selectedItemIndex).toEqual(1);

      HomeController.keyPressed({keyCode : 40});
      expect(HomeController.selectedItemIndex).toEqual(1);

      HomeController.keyPressed({keyCode : 38});
      expect(HomeController.selectedItemIndex).toEqual(0);

      HomeController.keyPressed({keyCode : 38});
      expect(HomeController.selectedItemIndex).toEqual(0);

      HomeController.keyPressed({keyCode : 40});
      expect(HomeController.selectedItemIndex).toEqual(1);
      HomeController.keyPressed({keyCode : 13});
      expect(HomeController.country).toEqual(dummyItem2.name);
      expect(HomeController.countries.length).toEqual(0);

      HomeController.countries.push(dummyItem);
      HomeController.countries.push(dummyItem2);
      HomeController.keyPressed({keyCode : 27});
      expect(HomeController.countries.length).toEqual(0);



    });
  });
});