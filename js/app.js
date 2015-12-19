// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones,
requirejs.config({
    "baseUrl": "js/vendor",
    "paths": {
      "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
      "exporting": "highcharts/exporting",
      "highcharts": "highcharts/highcharts",
      "highcharts3d": "highcharts/highcharts-3d"
    },
    "shim": {
            "highcharts3d": ["jquery", "highcharts"],
            "exporting": ["jquery", "highcharts"]
    }
});

// Load the main app module to start the app
requirejs(["../main"]);