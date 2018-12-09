require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var command = process.argv[2]; // HOLD THE COMMAND
var inputString = process.argv.slice(3).join(" "); // USER INPUT AFTER COMMAND

var bandsAPI = "https://rest.bandsintown.com/artists/" + 
                artist + 
                "/events?app_id=codingbootcamp";

var spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: 'All the Small Things'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });

// Functions for each command type
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says


