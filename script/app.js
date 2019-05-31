//Foursquare API info
const clientID = '2H51FMANDAQ23IQDIZADKXFGVMIOO5YXT0VHGVC2RMELXVAX';
const clientSecret = 'JYPY4IKK2QBXMSLB1V4TFBSVYW4A2QILTYBOJ42QK3QKF1CW';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

//APIXU Info
const apiKey = 'fcadfff8557741d4a5d122327193105';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

//Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednseday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
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

    const urlToFetch = '' + url + city + '&limit=10' + '&client_id=' + clientID + '&client_secret=' + clientSecret + '&v=' + currentDate();
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

const getForecast = () => {

}

// Render functions
const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
        // Add code here:

        let venueContent = '';
        $venue.append(venueContent);
    });
    $destination.append('<h2>${venues[0].location.city}</h2>');
}

const renderForecast = (days) => {
    $weatherDivs.forEach(($day, index) => {
        // Add code here

        let weatherContent = '';
        $day.append(weatherContent);
    });
}

const executeSearch = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDivs.forEach(day => day.empty());
    $destination.empty();
    $container.css("visibility", "visible");
    getVenues()
    getForecast()
    return false;
}

$submit.click(executeSearch);