$(document).ready(function() {
  // Set temp-button behavior
  var activetemp = "f";
  var fahrenheit = $("#f-button");
  var celsius = $("#c-button");
  fahrenheit.click(function() {
    if(fahrenheit.hasClass("active")) {
      fahrenheit.removeClass("active");
      celsius.addClass("active");
      activetemp = "c";
    } else {
      fahrenheit.addClass("active");
      celsius.removeClass("active");
      activetemp = "f";
    }
  });
  celsius.click(function() {
    if(celsius.hasClass("active")) {
      celsius.removeClass("active");
      fahrenheit.addClass("active");
      activetemp = "f";
    } else {
      celsius.addClass("active");
      fahrenheit.removeClass("active");
      activetemp = "c";
    }
  });

  var tempK, tempF, tempC, tempString;
  var loc, lat, lon, city, country;
  var weathermain, humidity, cloudiness, windspeed;
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
      weathermain = response.weather[0].main;
      humidity = response.main.humidity;
      cloudiness = response.clouds.all;
      windspeed = response.wind.speed;
      tempK = response.main.temp;
      tempF = tempK * 9/5 - 459.67;
      tempC = tempK - 273.15;
      if (activetemp == "f") {
        tempString = tempF.toFixed(2) + "&deg;" + " F";
      } else {
        tempString = tempC.toFixed(2) + "&deg;" + " C";
      }

      $("#latitude").html(lat);
      $("#longitude").html(lon);
      $("#location").html(city + ", " + country);
      $("#weather-main").html(weathermain);
      $("#weather-temp").html(tempString);
      $("#weather-humidity").html(humidity);
      $("#weather-clouds").html(cloudiness);
      $("#weather-wind-speed").html(windspeed);
    });
  }, "jsonp");

});
