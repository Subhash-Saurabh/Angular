(function(){
  'use strict';

  angular.module('PurchaseApp' , [])
  .controller('BuyItemsController' , BuyItemsController)
  .controller('BoughtItemsController' ,BoughtItemsController)
  .service('ShoppingListService',ShoppingListService);


    var buyList = [{ name:"Cookies",
                     quantity:10 },

                   { name:"Chocolates",
                     quantity:5 },

                     { name:"Milk",
                       quantity:2 },

                       { name:"Cake",
                         quantity:10 },

                         { name:"Bread",
                           quantity:15 }];




  BuyItemsController.$inject = ['ShoppingListService','$scope'];
  function BuyItemsController(ShoppingListService,$scope){
    var buyItem = this;

    buyItem.items = ShoppingListService.buyGetItems();

    buyItem.removeItem = function(itemIndex){
      ShoppingListService.removeItem(itemIndex);
    };

    buyItem.isNull = function(){
      return ShoppingListService.isNullBuyItems();
    }



  }




  BoughtItemsController.$inject = ['ShoppingListService','$scope'];
  function BoughtItemsController(ShoppingListService,$scope){

    var boughtItem = this;

    boughtItem.items = ShoppingListService.boughtGetItems();

    boughtItem.isNull = function(){
      return ShoppingListService.isNullBoughtItems();
    }

  }




  function ShoppingListService(){
    var service = this;

    var buyItems = buyList;
    var boughtItems = [];


    service.removeItem = function(itemIndex){
      boughtItems.push(buyItems[itemIndex]);
      buyItems.splice(itemIndex, 1);
    };

    service.buyGetItems = function(){
      return buyItems;
    };

    service.boughtGetItems = function(){
      return boughtItems;
    };

    service.isNullBuyItems = function(){
       if(buyItems.length > 0){
          return false;
        }
      else {
        return true;
      }
    };

    service.isNullBoughtItems = function(){
      if(boughtItems.length > 0){
        return false;
      }
      else{
        return true;
      }
    };
  }

})();
