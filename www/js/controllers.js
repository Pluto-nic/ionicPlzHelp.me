angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ProfileCtrl', function($scope, $http){
  $http.get('http://localhost:8080/openProj')
    .then(function(response){
      console.log(response);
      $scope.openProjects = response.data;
      //$scope.openProjects =
      // $scope.filteredProj = {}, $scope.expenditures = 0;
      // if(response.data){
      //   response.data.reduce(function(memo, current){
      //     memo[current.category] ? memo[current.category].push(current) 
      //       : memo[current.category] = [current];
      //     return memo;
      //   }, $scope.filteredProj);
      //   response.data.reduce(function(memo, current){
      //     if(!current.isActive){
      //       $scope.expenditures += current.cost;
      //     }
      //     return $scope.expenditures;
      //   });
      // }
      // // console.log('filtered Projects', $scope.filteredProj);
      // $scope.accountType = appFact.category
      // $scope.projects = response.data;
      // appFact.projects = response.data;
      // $scope.profile = appFact.profile;
      // $scope.userData = appFact.userData;
      // $state.go('index.list.overview');
    });
});
