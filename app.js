window.addEventListener('load', ()=> {
//after this page loads this function will run
  let longitude;
  let latitude;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimeZone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
//          console.log(position);  check weebsite to see coords
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        const proxy = 'http://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/9c80312f1ba5517d60241eda63398b17/${latitude},${longitude}`;
// edited out the default latitute and longitude and put in the functions to call position.coords.latitute etc

      fetch(api)
// after you fetch this information I can do something with this data
// .then waits for the api to get the information before doing anything else
        .then(response => {
            return response.json();
            })
              .then(data => {
                  const{temperature, summary, icon} = data.currently;
// Set DOM elements from the API
                  temperatureDegree.textContent = temperature;
                  temperatureDescription.textContent = summary;
                  locationTimeZone.textContent = data.timezone;
                  let celsius = (temperature - 32) * (5 / 9);
// formula for changing F into C
                  setIcon(icon, document.querySelector('.icon'));
// Set icon
                  temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                      temperatureSpan.textContent = "C";
                      temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                      temperatureSpan.textContent = "F";
                      temperatureDegree.textContent = temperature;
                    }
// When you click on C it'll turn into F and vice versa
                  });



            });
          });
         }

      function setIcon(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
// replace looks for every line and when it finds every line it's going to replace it with underscore due to skycon
// also changes all the letters to uppercase refer back to skycon documentation we can't do their text so we have to adjust ours
        skycons.play();
// to inititate when the animation goes off
        return skycons.set(iconID, Skycons[currentIcon]);
      }
});
