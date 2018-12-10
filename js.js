// 1. Before you can make any part of our site work, you need to create an array of strings, 
// each one related to a topic that interests you. Save it to a variable called `topics`.
// * We chose animals for our theme, but you can make a list to your own liking.
var topic = ["Golden Retriever", "French Bulldog", "Beagle", "Poodle", "Yorkshire Terrier", "Dachshund", "Shih Tzu", "Boston Terrier", "Pomeranian", "Havanese", "Chihuahua", "Maltese"];
var newTopic = null;
var topicGif = null;
var topicImage = null;
// 2. Your app should take the topics in this array and create buttons in your HTML.
// * Try using a loop that appends a button for each string in the array.
function renderButtons() {
    $("#btns-go-here").empty();
    for (var i = 0; i < topic.length; i++) {
        // Then dynamicaly generating buttons for each topic in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("topic");
        // Adding a data-attribute with a value of the topic at index i
        a.attr("data-name", topic[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(topic[i]);
        // Adding the button to the HTML
        $("#btns-go-here").append(a);
    }
}

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// 5. Under every gif, display its rating (PG, G, so on).
// * This data is provided by the GIPHY API.
// * Only once you get images displaying with button presses should you move on to the next step.
function queryGiphy() {
    $("button").on("click", function () {
        // In this case, the "this" keyword refers to the button that was clicked
        topicGif = $(this).attr("data-name");

        // Constructing a URL to search Giphy for the topic
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topicGif + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                console.log(results);

                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div for the gif
                        var gifDiv = $("<div>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Storing data animate
                        var animate = results[i].images.original.url;
                        
                        // Storing data still
                        var still = results[i].images.original_still.url;
                        
                        console.log("still: " + still);
                        console.log("animate: " + animate);


                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        topicImage = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        topicImage.attr("src", results[i].images.fixed_height.url);

                        // Appending the paragraph and topicImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(topicImage);

                        // Prepending the gifDiv to the "#gifs-go-here" div in the HTML
                        $("#gifs-go-here").prepend(gifDiv);
                    }
                }
            });
    });
}

$(document).ready(function () {
    renderButtons();
    queryGiphy();
    // 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. 
    // Then make a function call that takes each topic in the array remakes the buttons on the page.
    $("#add-topic").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        newTopic = $("#topic-input").val().trim();
        // The topic from the textbox is then added to our array
        topic.push(newTopic);

        // calling renderButtons which handles the processing of the topic array
        renderButtons();
        queryGiphy();
    });

    // 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

    $("#img").on("click", function () {
        console.log("Image Clicked");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});




