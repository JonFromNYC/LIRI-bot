// Required
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

// Variables to hold user input
var command = process.argv[2]; // HOLD THE COMMAND
var inputString = process.argv.slice(3).join(" "); // USER INPUT AFTER COMMAND

var bandsInTownAPI = "https://rest.bandsintown.com/artists/" + 
                inputString +
                "/events?app_id=codingbootcamp";

var spotify = new Spotify(keys.spotify);

if (command === "concert-this") {
    getConcertInfo();
} else if (command === "spotify-this-song") {
    getSpotifyInfo();
} else if (command === "movie-this") {
    getMovieInfo();
}

// --- Functions
function getSpotifyInfo() {
    spotify.search({
        type: 'track',
        query: inputString
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
        // data.tracks.items[args]
    });
}


// Functions for each command type
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

function getConcertInfo() {
    axios.get(bandsInTownAPI)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getMovieInfo() {
    // OMDB data requests: http://www.omdbapi.com/?apikey=[yourkey]&
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + inputString).then(
        function (response) {
            var m = response.data; // To save typing time later
            
            // variables to hold specific data points
            var mTitle, mYear, mIMDB, mTomato, mCountry, mLanguage, mPlot, mActors;

            mTitle = m.Title;
            mYear = m.Year;
            mIMDB = m.Ratings[0].Value;
            mTomato = m.Ratings[1].Value;
            mCountry = m.Country;
            mLanguage = m.Language;
            mPlot = m.Plot;
            mActors = m.Actors;

            console.log("\nMovie Title: \t" + mTitle +
                        "\nReleased: \t" + mYear + 
                        "\nIMDB Rating: \t" + mIMDB + 
                        "\nRotten Tomato: \t" + mTomato + 
                        "\nProduced in: \t" + mCountry + 
                        "\nLanguages: \t" + mLanguage + 
                        "\n\nPlot: \t\t" + mPlot + 
                        "\n\nActor(s): \t" + mActors);
        }
    );
}

function doWhatThisSays() {
    
}