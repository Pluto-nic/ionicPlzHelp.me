angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

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

.controller('ProfileCtrl', function($scope, $http, appFact){
  console.log(appFact);
  $http.post('http://www.plzHelp.me/clientOpenProj', {user_id: appFact.profile.user_id})
    .then(function(response){
      console.log(response);
      $scope.openProjects = response.data;
    });
  $http.post('http://www.plzHelp.me/clientClosedProj', {ClientUserId: appFact.profile.user_id})
    .then(function(response){
      console.log(response);
      $scope.closedProjects = response.data;
    });
})
/////////////////////
//for some reason, the order of these controllers matter... LoginCtrl must go last
/////////////////////
.controller('SearchCtrl', function($scope, $http, $state, appFact){
  $scope.search = function(jobName, jobDescription, cost, jobType){
    $scope.data = {name: jobName, description: jobDescription, category: jobType, cost: cost, ClientUserId: appFact.profile.user_id};
    $http.post('http://www.plzHelp.me/createProject', $scope.data)
      .then(function(response){
        console.log(response);
        $scope.search.jobName = null;
        $scope.search.jobDescription = null;
        $scope.search.jobType = null;
        $scope.search.cost = null;
      }, function(response){
        console.log('ERROR');
      });
  }
  $scope.clear = function(){
    $scope.search.jobName = null;
  }
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

.controller('settingsCtrl',['$scope','$stateParams', 'appFact', '$http', function($scope, $stateParams, appFact, $http){
  $scope.updateUser = function(){
    if($scope.accountType === 'Client'){
      appFact.userData.firstName = $scope.settings.firstName || appFact.userData.firstName;
      appFact.userData.lastName  = $scope.settings.lastName  || appFact.userData.lastName;
      appFact.userData.email     = $scope.settings.email     || appFact.userData.email;
      appFact.userData.address   = $scope.settings.address   || appFact.userData.address;
      appFact.userData.city      = $scope.settings.city      || appFact.userData.city;
      appFact.userData.state     = $scope.settings.state     || appFact.userData.state;
      appFact.userData.zipcode   = $scope.settings.zipcode   || appFact.userData.zipcode;
      appFact.userData.phone     = $scope.settings.phone     || appFact.userData.phone;
      appFact.userData.smsOption = $scope.settings.smsOption || appFact.userData.smsOption;
      appFact.userData.gravatar  = appFact.profile.gravatar;
      appFact.userData.user_id   = appFact.profile.user_id;
     $http.post('/createUser', appFact.userData)
      .then(function(response){
         $state.go('index.list.overview');
      });
    }
  };
}])


.controller('LoginCtrl', function($scope, auth, $state, store, appFact, $http) {
 auth.signin({
   authParams: {
     // This asks for the refresh token
     // So that the user never has to log in again
     scope: 'openid offline_access',
     // This is the device name
     device: 'Mobile device'
   },
   // Make the widget non closeable
   standalone: true
 }, function(profile, token, accessToken, state, refreshToken) {
         // Login was successful
   // We need to save the information from the login
   store.set('profile', profile);

      appFact.profile  = profile;
  $http.post('http://localhost:8080/clientInfo', {user_id: profile.user_id})
    .then(function(res){
      appFact.userData = res.data;
    }).catch(function(err){console.log(err)});

   store.set('token', token);
   store.set('refreshToken', refreshToken);
   $state.go('app.profile');
 }, function(error) {
   // Oops something went wrong during login:
   console.log("There was an error logging in", error);
 })

});
