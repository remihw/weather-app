var cssWeatherIcons = {
  "clear": "wi wi-day-sunny",
  "sunny": "wi wi-day-sunny",
  "partlysunny": "wi wi-day-cloudy",
  "mostlysunny": "wi wi-day-cloudy",
  "cloudy": "wi wi-cloudy",
  "partlycloudy": "wi wi-cloudy",
  "mostlycloudy": "wi wi-cloudy",
  "rain": "wi wi-rain",
  "chancerain": "wi wi-rain",
  "snow": "wi wi-snow",
  "chancesnow": "wi wi-snow",
  "flurries": "wi wi-snow-wind",
  "chanceflurries": "wi wi-snow-wind",
  "sleet": "wi wi-sleet",
  "chancesleet": "wi wi-sleet",
  "tstorms": "wi wi-storm-showers",
  "chancetstorms": "wi wi-storm-showers",
  "fog": "wi wi-fog",
  "hazy": "wi wi-day-haze"
};

var getGeolocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, showError);
  } else {
    $("#txt-loading").text("Geolocation is not supported by this browser.");
  }
};

var showError = function(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      $("#txt-loading").text("The request to get user location was denied.");
      break;
    case error.POSITION_UNAVAILABLE:
      $("#txt-loading").text("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      $("#txt-loading").text("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      $("#txt-loading").text("An unknown error occurred.");
      break;
  }
};

var getPosition = function(location) {
  var position = location.coords.latitude + "," + location.coords.longitude;
  getWeatherToday(position);
};

var getWeatherToday = function(position) {
  var url = "https://api.wunderground.com/api/a7a72152a45ca63e/conditions/astronomy/q/";
  $.getJSON(url + position + "." + "json", function(data) {
    if (data.response.hasOwnProperty("error")) {
      console.log("An error occured while loading weather data.");
    } else {
      $("#city").text(data.current_observation.display_location.city);
      $("#country").text(data.current_observation.display_location.state_name);
      $("#icon-today").addClass(cssWeatherIcons[data.current_observation.icon]);
      $("#temp-c-today").html(Math.round(data.current_observation.temp_c));
      $("#temp-f-today").html(Math.round(data.current_observation.temp_f));
      $("#condition-today").text(data.current_observation.weather);
    }
  }).done(function() {
    getWeatherForecast(position);
  });
};

var getWeatherForecast = function(position) {
  var url = "https://api.wunderground.com/api/a7a72152a45ca63e/forecast/q/";
  $.getJSON(url + position + "." + "json", function(data) {
    var path = data.forecast.simpleforecast.forecastday;
    if (data.response.hasOwnProperty("error")) {
      console.log("An error occured while loading weather data.");
    } else {
      $("#day-1-icon").addClass(cssWeatherIcons[path[0].icon]);
      $("#day-1-name").text(path[1].date.weekday.toUpperCase());
      $("#day-1-c-low").html(path[1].low.celsius + "&deg;");
      $("#day-1-f-low").html(path[1].low.fahrenheit + "&deg;");
      $("#day-1-c-high").html(path[1].high.celsius + "&deg;");
      $("#day-1-f-high").html(path[1].high.fahrenheit + "&deg;");			
      $("#day-2-icon").addClass(cssWeatherIcons[path[1].icon]);
      $("#day-2-name").text(path[2].date.weekday.toUpperCase());
      $("#day-2-c-low").html(path[2].low.celsius + "&deg;");
      $("#day-2-f-low").html(path[2].low.fahrenheit + "&deg;");
      $("#day-2-c-high").html(path[2].high.celsius + "&deg;");
      $("#day-2-f-high").html(path[2].high.fahrenheit + "&deg;");			
      $("#day-3-icon").addClass(cssWeatherIcons[path[2].icon]);
      $("#day-3-name").text(path[3].date.weekday.toUpperCase());
      $("#day-3-c-low").html(path[3].low.celsius + "&deg;");
      $("#day-3-f-low").html(path[3].low.fahrenheit + "&deg;");
      $("#day-3-c-high").html(path[3].high.celsius + "&deg;");			
      $("#day-3-f-high").html(path[3].high.fahrenheit + "&deg;");			
    }
  }).done(function() {
    $("#txt-loading").css("display", "none");
    $("#weather-display").css("display", "block");
  });
};

$("#btn-f-unit").on("click", function() {
  $(".fahrenheit").css("display", "inline-block");
  $(".celcius").css("display", "none");
  $("#btn-c-unit").css("color", "#aeaeae");
  $("#btn-f-unit").css("color", "#000000");
});

$("#btn-c-unit").on("click", function() {
  $(".fahrenheit").css("display", "none");
  $(".celcius").css("display", "inline-block");
  $("#btn-c-unit").css("color", "#000000");
  $("#btn-f-unit").css("color", "#aeaeae");
});

if (location.protocol !== "https:") {
  $("#txt-loading").text("Please use \"https\" to enable Geolocation for this page.");
} else {
  getGeolocation();
}