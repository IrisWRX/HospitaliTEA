// Prevents the form's default submission behavior
// and calls "writePosts" when the form is submitted.
document
  .getElementById("post-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    writePosts();
  });

// Retrieves values from various form input elements
function writePosts() {
  console.log("inside write post");
  let Name = document.getElementById("name").value;
  let Address = document.getElementById("address").value;
  let Email = document.getElementById("email").value;
  let Status = document.getElementById("status").value;
  let amenities = $("#amenities").val();
  let selectedAmenities = {};
  for (let i = 0; i < amenities.length; i++) {
    let amenityName = amenities[i];
    selectedAmenities[amenityName] = true;
  }
  console.log(Name, Address, Email, Status, selectedAmenities);

  // Sets up an authentication state observer
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;

        currentUser
          .collection("posts")
          .add({
            name: Name,
            address: Address,
            email: Email,
            status: Status,
            amenities: selectedAmenities,
            userID: userID,
            userEmail: userEmail,
          })
          .then((docRef) => {
            alert("Post successfully saved!");
            uploadPic(docRef, ImageFile);
          });
      });
    } else {
      console.log("No user is signed in");
      window.location.href = "login.html";
    }
  });

  // Uploads the image file to Firebase Storage
  // and updates the URL of the corresponding image in Firestore document
  function uploadPic(postDocID, imageFile) {
    console.log("inside uploadPic " + postDocID.id);
    var storageRef = storage.ref("images/" + postDocID.id + ".jpg");
    var metadata = {
      contentType: imageFile.type,
    };

    storageRef
      .put(ImageFile, metadata)
      .then(function () {
        console.log("Uploaded to Cloud Storage.");
        storageRef.getDownloadURL().then(function (url) {
          console.log("Got the download URL.");
          postDocID
            .update({
              image: url,
            })
            .then(function () {
              console.log("Added pic URL to Firestore.");
            });
        });
      })
      .catch((error) => {
        console.log("error uploading to cloud storage");
      });
  }
}

// Lets the user select an image file using a file input element,
// and then displays the selected image on the webpage.
var ImageFile;
function listenFileSelect() {
  var fileInput = document.getElementById("mypic-input");
  const image = document.getElementById("mypic-goes-here");

  fileInput.addEventListener("change", function (e) {
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);
    image.src = blob;
  });
}
listenFileSelect();

// Sets up a dropdown list element with options and settings
$(document).ready(function () {
  $("#amenities").select2({
    placeholder: "Select amenities",
    allowClear: true,
    templateSelection: function (data, container) {
      if (data.selected) {
        $(container).prepend('<input type="checkbox" checked />');
      }
      return data.text;
    },
    templateResult: function (data) {
      var $result = $("<span></span>");
      var $checkbox = $('<input type="checkbox" />').prop(
        "checked",
        data.selected
      );
      $result.append($checkbox);
      $result.append(" " + data.text);
      return $result;
    },
  });
});
