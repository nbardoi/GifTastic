var topics = ["Vampire Diaries", "Grey's Anatomy", "Friends", "The Office", "Stranger Things", "Fresh off the Boat", "Scandal", 
"The Walking Dead", "Riverdale", "The Flash", "Jane the Virgin", "Supernatural", "Orange is the New Black", "The Simpsons", "How I Met Your Mother",
"Lucifer", "Gotham", "Modern Family", "LOST", "The Good Place", "Empire", "The Big Bang Theory", "Suits", "Criminal Minds", "Game of Thrones"];


function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("series");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

function displaySeriesInfo() {

var series = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + series + "&api_key=08LNF4vUuBTJ18njQbxT18GpTookI3tp&limit=10";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
    var showDiv = $("<div>");
    var p = $("<p>").text("Rating: " + results[i].rating)
    var showImage = $("<img>");
    showImage.attr("src", results[i].images.fixed_height_still.url);
    showImage.attr("data-still", results[i].images.fixed_height_still.url);
    showImage.attr("data-animate", results[i].images.fixed_height.url);
    showImage.attr("data-state", "still");
    showImage.addClass("gif");
    showDiv.append(showImage);
    showDiv.append(p);
    $("#series-gifs-view").prepend(showDiv);
    }
    });
}

$("#add-series").on("click", function(event) {
    event.preventDefault();
    var show = $("#series-input").val().trim();
    topics.push(show);
    renderButtons();
});

$(document).on("click", ".series", displaySeriesInfo);

renderButtons();

$(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

      } else if (state == "animate"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    };
  });