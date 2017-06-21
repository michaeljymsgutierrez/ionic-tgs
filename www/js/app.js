// main tgs module
var app = angular.module('tgs', ['ionic','ngCordova','ion-datetime-picker']);

app.run(function($ionicPlatform, $cordovaSQLite, $ionicPickerI18n) {
  
    $ionicPlatform.ready(function() {
      
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      // ION-datetime-picker style configuration
      $ionicPickerI18n.okClass = "button-assertive";
      $ionicPickerI18n.cancelClass = "button-stable";
      $ionicPickerI18n.arrowButtonClass = "button-assertive";

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

       // Initialize table for payday weekday schedule
       $cordovaSQLite.execute(db,'CREATE TABLE IF NOT EXISTS payday_weekday (id integer primary key, payday_weekday_date text, payday_weekday_start text, payday_weekday_end text)')
       .then(function(res){
          console.log(res);
       },function(err){
          console.log(err);
       });


      // Initialize table for non payday weekday schedule
       $cordovaSQLite.execute(db,'CREATE TABLE IF NOT EXISTS non_payday_weekday (id integer primary key, non_payday_weekday_date text, non_payday_weekday_start text, non_payday_weekday_end text)')
       .then(function(res){
          console.log(res);
       },function(err){
          console.log(err);
       });


        // Initialize table for payday weekend schedule
       $cordovaSQLite.execute(db,'CREATE TABLE IF NOT EXISTS payday_weekend (id integer primary key, payday_weekend_date text, payday_weekend_start text, payday_weekend_end text)')
       .then(function(res){
          console.log(res);
       },function(err){
          console.log(err);
       });

    });
});
