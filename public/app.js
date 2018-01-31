// Grab the articles as a json
$.getJSON("/articles", function(body) {
  // For each one
  for (var i = 0; i < body.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p body-id='" + body[i]._id + "'>" + body[i].title + "<br />" + body[i].summary + "<br />" + body[i].link + "</p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("body-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(body) {
      console.log(body);
      // The title of the article
      $("#notes").append("<h2>" + body.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + body._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (body.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(body.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(body.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("body-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(body) {
      // Log the response
      console.log(body);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
