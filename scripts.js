function setWeatherImage(weather) {
  var imageHTML = "<img class='img-responsive' id='weather-image' src='";
  var clearImagePath = "images/clearskies.jpg";
  var cloudyImagePath = "images/cloudyskies.jpg";
  var mistImagePath = "images/mist.jpg";
  var snowImagePath = "images/snow.jpg";
  var rainImagePath = "images/rain.jpg";
  var stormImagePath = "images/storm.jpg";
  var nonsenseImagePath = "images/kittens.jpg";
  var caboose = "'>";

  switch (weather) {
    case "Clear":
      imageHTML += clearImagePath;
      break;
    case "Clouds":
      imageHTML += cloudyImagePath;
      break;
    case "Mist":
      imageHTML += mistImagePath;
      break;
    case "Snow":
      imageHTML += snowImagePath;
      break;
    case "Rain":
      imageHTML += rainImagePath;
      break;
    case "Storm":
      imageHTML += stormImagePath;
      break;
    default:
      imageHTML += nonsenseImagePath;
  }

  imageHTML += caboose;
  $("#weather-image-wrapper").html(imageHTML);
}


$(document).ready(function() {
  // Set temp-button behavior
  var fahrenheit = $("#f-button");
  var celsius = $("#c-button");
  var tempK, tempF, tempC, loc, lat, lon, city, country, weather;
 
  celsius.addClass("active");
  fahrenheit.click(function() {
    if(!fahrenheit.hasClass("active")) {
      fahrenheit.addClass("active");
      celsius.removeClass("active");
      activetemp = "f";
      $("#weather-temp").html(tempF + "&deg; F");
    }
  });
  celsius.click(function() {
    if(!celsius.hasClass("active")) {
      celsius.addClass("active");
      fahrenheit.removeClass("active");
      activetemp = "c";
      $("#weather-temp").html(tempC + "&deg; C");
    }
  });

  // Get IP data
  $.get("http://ipinfo.io", function(response) {
    loc = response.loc.split(",");
    lat = loc[0];
    lon = loc[1];
    var KEY = '2ed8130dd5204a5e0f953939145817ee';
    // Get weather data
    $.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + KEY, function(response) {
      city = response.name;
      country = response.sys.country;
      weather = response.weather[0].main;
      tempK = response.main.temp;
      tempF = (tempK * 9/5 - 459.67).toFixed(2);
      tempC = (tempK - 273.15).toFixed(2);

      setWeatherImage(weather);
      $("#lat-and-lon").html("@ (" + lat + ", " + lon + ")");
      $("#location").html(city + ", " + country);
      $("#weather-main").html(weather);
      $("#weather-temp").html(tempC + "&deg; C");
    });
  }, "jsonp");

});
