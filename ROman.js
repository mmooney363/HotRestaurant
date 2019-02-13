var express = require("express");
var path    = require("path");

var app  = express();
var PORT = 3000;

// Global variables
var reserveArray = [];
var waitArray    = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/reservations", function(req, res) {
    return res.json(reserveArray);
});

app.get("/api/waitlisted", function(reg, res) {
    return res.json(waitArray);
});

app.post("/api/reserve", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;

    console.log(newReservation);

    if (reserveArray.length < 5) {
      reserveArray.push(newReservation);
      console.log("Reservation accepted!")
    } else {
      waitArray.push(newReservation);
      console.log("You've been added to the waitlist.")
    };

    res.json(reserveArray);
    
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});