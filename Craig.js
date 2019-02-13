
$("#submit").on("click", function () {
    event.preventDefault();

    var newReservation = {
        name: $("#name").val().trim(),
        phone: $("#phone").val().trim(),
        email: $("#email").val().trim(),
        uid: $("#uid").val().trim()
    }

    // Using a RegEx Pattern to remove spaces from searchedCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation = newReservation.replace(/\s+/g, "").toLowerCase();

    $.post("/api/reserve", newReservation)
        .then(function (data) {
            console.log("reserve.html", data);
            alert("Adding reservation...");
        });

});

app.post("/api/reserve", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;

    // Using a RegEx Pattern to remove spaces from newReservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    if (reserveArray.length <= 5) {
      reserveArray.push(newReservation);
    } else {
      waitArray.push(newReservation);
    };
    
});


