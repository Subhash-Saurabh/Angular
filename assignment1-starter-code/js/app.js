(function(){
  'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController' ,function($scope){
    $scope.items = "";
    $scope.myReply = '';
    $scope.Reply = function (){
      $scope.myReply = CheckTooMuch($scope.items);
    };

    function CheckTooMuch(string){
      var answer = '';
      if (string === ""){
        answer = "Please enter data first";
      }
      else{
        var total = string.split(',').length;
        if (total <= 3 && total > 0 ){
          answer = 'Enjoy';
        }
        else{
          answer = 'Too Much';
        }
      }
      return answer;
    };

  });




})();
