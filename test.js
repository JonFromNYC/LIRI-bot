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
    console.log("\nChecking Bands in Town\n");
    getConcertInfo();
} else if (command === "spotify-this-song") {
    console.log("\nCalling Spotify\n");
    getSpotifyInfo();
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
