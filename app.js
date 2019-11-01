var tvShows = ["Vampire Diaries", "Grey's Anatomy", "Friends", "The Office", "Stranger Things", "Fresh off the Boat", "Scandal", 
"The Walking Dead", "Riverdale", "The Flash", "Jane the Virgin", "Supernatural", "Orange is the New Black", "The Simpsons", "NCIS",
"Lucifer", "Gotham", "Modern Family", "LOST", "The Good Place", "Empire", "The Big Bang Theory", "Suits", "Criminal Minds", "Game of Thrones"];


function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < tvShows.length; i++) {
        var a = $("<button>");
        a.addClass("series");
        a.attr("data-name", tvShows[i]);
        a.text(tvShows[i]);
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
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
    var showDiv = $("<div>");
    var p = $("<p>");
    $("p").text("Rating: " + results[i].rating)
    var showImage = $("<img>");
    showImage.attr("src", results[i].images.fixed_height.url);
    showDiv.append(p);
    showDiv.append(showImage);
    $("#series-gifs-view").prepend(showDiv);
    }
    });
}

$("#add-series").on("click", function(event) {
    event.preventDefault();
    var show = $("#series-input").val().trim();
    tvShows.push(show);
    renderButtons();
});

$(document).on("click", ".series", displaySeriesInfo);

renderButtons();