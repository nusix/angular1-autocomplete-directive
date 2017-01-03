import HomeModule from './home'

describe('Home', () => {
  let $rootScope, $state, $location, $componentController, $compile;

  beforeEach(window.module(HomeModule));

  beforeEach(inject(($injector, $http, _$httpBackend_) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  describe('Module', () => {
    it('default component should be home', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).toEqual('home');
    });
  });

  describe('Controller', () => {
    // controller specs
    let controller;
    beforeEach(() => {
      controller = $componentController('home', {
        $scope: $rootScope.$new()
      });
    });

    it('has a name property', () => { 
      
    });
  });
});