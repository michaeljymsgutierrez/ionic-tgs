// main tgs module
var app = angular.module('tgs', ['ionic','ngCordova']);

app.run(function($ionicPlatform, $cordovaSQLite) {
  
    $ionicPlatform.ready(function() {
      
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

       db = $cordovaSQLite.openDB({name:'tgs.db',location:'default'});
       // db = window.openDatabase("tgs.db", "1.0", "Cordova Demo", 200000);
       
       // Initialize table for store settings
       $cordovaSQLite.execute(db,'CREATE TABLE IF NOT EXISTS store_settings(id integer primary key, store_code text, store_branch text, store_address text, store_type text, store_manager)')
       .then(function(res){ 
          console.log(res);
       },function(err){
       		console.log(err);
       });

       // Initialize table for survey language
       $cordovaSQLite.execute(db,'CREATE TABLE IF NOT EXISTS survey_language (id integer primary key, language text)')
       .then(function(res){
          console.log(res);
       },function(err){
          console.log(err);
       });

    });
});
