//Foursquare API info
const clientId = '2H51FMANDAQ23IQDIZADKXFGVMIOO5YXT0VHGVC2RMELXVAX';
const clientSecret = 'JYPY4IKK2QBXMSLB1V4TFBSVYW4A2QILTYBOJ42QK3QKF1CW';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

//APIXU Info
const apiKey = 'e15d871f3ef540e3b5192143190606';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

//Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednseday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//AJAX functions:
const getVenues = async () => {
    const city = $input.val();
    const currentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = today.getMonth()+1;
        const dd = today.getDate();
        const doubleDigit = (digit) => {
            if(digit < 10){
                return '0' + digit;
            } else {
                return digit;
            }
        }
        const currentDateFormat = '' + yyyy + doubleDigit(mm) + doubleDigit(dd);
        return currentDateFormat;
    };
    const urlToFetch = '' + url + city + '&limit=10' + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + currentDate();
    try {
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            return venues;
        }
    } catch (error) {
        console.log(error);  
    }
};

const getForecast = async () => {
    const city = $input.val();
    const urlToFetch = forecastUrl + apiKey + '&q=' + city + '&days=4' + '&hour=11';
      try {
      const response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
        const days = jsonResponse.forecast.forecastday;
        return days;
      }
    } catch (error) {
      console.log(error);
    }
  }

const createVenueHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>`;
}
const createWeatherHTML = (currentDay) => {
    return `<h2> High: ${currentDay.day.maxtemp_f}</h2>
    <h2> Low: ${currentDay.day.mintemp_f}</h2>
    <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
    <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>`;
}

const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
        const venue = venues[index];
        const venueIcon = venue.categories[0].icon;
        const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
        let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
        $venue.append(venueContent);
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
    $weatherDivs.forEach(($day, index) => {
        const currentDay = days[index];
        let weatherContent = createWeatherHTML(currentDay);
        $day.append(weatherContent);
    });
}

const executeSearch = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDivs.forEach(day => day.empty());
    $destination.empty();
    $container.css("visibility", "visible");
    getVenues()
        .then(venues => {
            return renderVenues(venues);
        })
        .catch(rejectionRequest => {
            console.log(rejectionRequest);
        });
    getForecast()
        .then(forecast => {
            return renderForecast(forecast);
        })
        .catch(rejectionReason => {
            console.log(rejectionReason)
        });
    return false;
}

$submit.click(executeSearch);