(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItems);

  function FoundItems(){
    var ddo = {
      templateUrl : 'foundItems.html',
      scope : {
        found: '<' ,
        onRemove: '&'
      }
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService','$scope']
  function NarrowItDownController(MenuSearchService,$scope){
    var list = this;
    list.search = function(){
      var promise = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
      promise.then(function(response){
        list.found = response;
      })
    };

    list.removeItem = function(itemIndex){
      list.found.splice(itemIndex,1);
    };
  }




  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      service.data = [];
      return $http({
        method: "GET",
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      })
      .then(function(response){
        for (var i = 0; i < response.data.menu_items.length; i++) {
          if (response.data.menu_items[i].description.indexOf(searchTerm) !== -1){
            service.data.push(response.data.menu_items[i])
          }
        }
        return service.data;
      })
      .catch(function (error) {
      console.log(error);
    })
    };

  }



})();
