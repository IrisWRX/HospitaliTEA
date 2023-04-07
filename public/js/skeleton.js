// Loads the footer and nav
function loadSkeleton() {
  $("#footerPlaceholder").load(
    "./footer.html",
    function (response, status, xhr) {
      console.log("Loaded footer:", status);
      if (status == "error") {
        console.log("Error loading footer:", xhr.status, xhr.statusText);
      }
    }
  );
  $("#navbarPlaceholder").load(
    "./navbar.html",
    function (response, status, xhr) {
      console.log("Loaded navbar:", status);
      if (status == "error") {
        console.log("Error loading navbar:", xhr.status, xhr.statusText);
      }
    }
  );
}

// Invoke the function
loadSkeleton();
