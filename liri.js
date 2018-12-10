// Required
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
moment().format();
var fs = require("fs");

// Variables to hold user input
var command = process.argv[2]; // HOLD THE COMMAND
var inputString = process.argv.slice(3).join(" "); // USER INPUT AFTER COMMAND

var bandsInTownAPI = "https://rest.bandsintown.com/artists/" +
    inputString +
    "/events?app_id=codingbootcamp";

var spotify = new Spotify(keys.spotify);

getInfo();
// Functions
// ====================
function getInfo() {

    // Call appropriate function based on user input
    if (command === "concert-this") {
        getConcertInfo();
    } else if (command === "spotify-this-song") {
        getSpotifyInfo();
    } else if (command === "movie-this") {
        getMovieInfo();
    } else if (command === "do-what-it-says") {
        doWhatThisSays();
    } else {
        console.log("You didn't enter the correct command");
    }
} // End of getInfo()

function getSpotifyInfo() {

    if (inputString === "") {
        inputString = "The Sign Ace of Base";
    }
    // Search Spotify
    spotify.search({
        type: 'track',
        query: inputString
    }, function (err, data) {

        // Catch if an error occured
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // Display album
        console.log("Album:\t " + data.tracks.items[0].album.name);

        // Display Artist
        console.log("Artist:\t " + data.tracks.items[0].album.artists[0].name);

        // Condition to catch null-values for Preview URL's
        if (data.tracks.items[0].preview_url === null) {
            console.log("Preview: No preview available");
        } else {
            console.log("Preview: " + data.tracks.items[0].preview_url + "\n");
        }
    });
} // End of getSpotifyInfo()

function getConcertInfo() {

    // Catch if input was blank
    if (inputString === "") {
        console.log("Try again.");
    }
    // Get info from Bands in Town
    axios.get(bandsInTownAPI)
        .then(function (response) {

            var eachConcert = response.data;
            // Loop through and format data foreasier reading in console
            for (i = 0; i < eachConcert.length; i++) {
                var venue = eachConcert[i].venue.name;
                // Condition to check if venue is in United States
                if (eachConcert[i].country === "United States") {
                    // This will print a venue within the United States
                    var location = eachConcert[i].venue.city + ", " + eachConcert[i].venue.region
                } else {
                    // This will print a venue outside the United States
                    var location = eachConcert[i].venue.city + ", " + eachConcert[i].venue.country
                }
                var date = moment(eachConcert[i].datetime); // hold the date
                date = date.format("llll"); // format the date
                // Concatenate event data to neatly print
                var eachVenue = ("\nEvent Name:\t" + venue +
                    "\nLocation:\t" + location +
                    "\nDate:\t\t" + date + "\n");
                console.log(eachVenue); // Print the event
            }
        })
        .catch(function (error) {
            console.log("Please enter an artist name.");
        });
} // End of getConcertInfo()

function getMovieInfo() {

    // Catch if movie was not entered
    if (inputString === "") {
        inputString = "Mr. Nobody";
    }
    // Get information from OMDB
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

            // Concatenated info to be displayed
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
} // End of getMovieInfo()

function doWhatThisSays() {

    // Read the text file
    fs.readFile("random.txt", "utf-8", function (error, data) {

        // Catch any errors
        if (error) {
            return console.log(error);
        }

        // HOLD CONTENTS OF TEXT FILE. DELIMIT BY COMMA.
        var dataArray = data.split(",");

        // PASS TEXT FILE CONTENTS INTO CORRECT TARGET FUNCTION
        command = dataArray[0];
        inputString = dataArray[1];
        getInfo();
        saveLog(data); // Save a log of event
    });
} // End of doWhatThisSays()

function saveLog(newLogData) {

    // Save events to a log text file
    var divider = "\n";
    var time = moment().format("llll");
    fs.appendFile("log.txt", time + " " + newLogData + divider, function (err) {
        if (err) {
            throw err;
        }
    });
} // End of saveLog()