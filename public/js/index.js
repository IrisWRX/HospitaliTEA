// Get the DOM element with the ID "get-started-btn"
document
  .getElementById("get-started-btn")
  // Attach an event listener to the button for the "click" event
  .addEventListener("click", function () {
    // When the button is clicked, change the browser's location to "login.html"
    window.location.href = "login.html";
  });
