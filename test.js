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

getInfo();

function getInfo() {
    if (command === "concert-this") {
        getConcertInfo();
    } else if (command === "spotify-this-song") {
        getSpotifyInfo();
    } else if (command === "movie-this") {
        getMovieInfo();
    } else if (command === "do-what-it-says") {
        doWhatThisSays();
    }
}

// --- Functions
function getSpotifyInfo() {
    console.log("\ngetSpotifyInfo() was called.\n");
    
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

function getConcertInfo() {
    console.log("\ngetConcertInfo() was called.\n");
    axios.get(bandsInTownAPI)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getMovieInfo() {
    console.log("\ngetMovieInfo() was called.\n");
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
    console.log("\ndoWhatThisSays() was called.\n");
    fs.readFile("t.txt","utf-8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // HOLD CONTENTS OF TEXT FILE. DELIMIT BY COMMA.
        var dataArray = data.split(","); 
        // PASS TEXT FILE CONTENTS INTO CORRECT TARGET FUNCTION
        command = dataArray[0];
        inputString = dataArray[1];
        getInfo();
    })
}