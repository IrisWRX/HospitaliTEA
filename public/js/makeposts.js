document
  .getElementById("post-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    writePosts();
  });

function writePosts() {
  console.log("inside write post");
  let Name = document.getElementById("name").value;
  let Address = document.getElementById("address").value;
  let Email = document.getElementById("email").value;
  let Status = document.getElementById("status").value;
  let amenities = $('#amenities').val();
  let selectedAmenities = {};
  for (let i = 0; i < amenities.length; i++) {
    let amenityName = amenities[i];
    selectedAmenities[amenityName] = true;
  }
  console.log(Name, Address, Email, Status, selectedAmenities);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;

        currentUser
          .collection("posts") // create a subcollection called "posts" under the current user document
          .add({
            name: Name,
            address: Address,
            email: Email,
            status: Status,
            amenities: selectedAmenities,
            userID: userID,
            userEmail: userEmail,
            // timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then((docRef) => {
            alert("Post successfully saved!");
            uploadPic(docRef, ImageFile);
            // window.location.href = 'home.html';
          });
      });
    } else {
      console.log("No user is signed in");
      window.location.href = "login.html";
    }
  });

  function uploadPic(postDocID, imageFile) {
    console.log("inside uploadPic " + postDocID.id);
    var storageRef = storage.ref("images/" + postDocID.id + ".jpg");

    // Include the content type for the image in the metadata
    var metadata = {
      contentType: imageFile.type,
    };

    storageRef
      .put(ImageFile, metadata) // Pass metadata along with ImageFile
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

var ImageFile;
function listenFileSelect() {
  // listen for file selection
  var fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("mypic-goes-here"); // pointer #2

  // When a change happens to the File Chooser Input
  fileInput.addEventListener("change", function (e) {
    ImageFile = e.target.files[0]; //Global variable
    var blob = URL.createObjectURL(ImageFile);
    image.src = blob; // Display this image
  });
}
listenFileSelect();
