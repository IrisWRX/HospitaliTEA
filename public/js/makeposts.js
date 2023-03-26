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
  let amenities = document.querySelectorAll('input[name="amenities"]:checked');
  let selectedAmenities = {};
  for (let i = 0; i < amenities.length; i++) {
    let amenityName = amenities[i].value;
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
// function showUploadedPicture() {
//     const fileInput = document.getElementById("mypic-input"); // pointer #1
//     const image = document.getElementById("mypic-goes-here"); // pointer #2

//     //attach listener to input file
//     //when this file changes, do something
//     fileInput.addEventListener('change', function (e) {

//         //the change event returns a file "e.target.files[0]"
//         var blob = URL.createObjectURL(e.target.files[0]);

//         //change the DOM img element source to point to this file
//         image.src = blob; //assign the "src" property of the "img" tag
//     })
// }
// showUploadedPicture();

// var ImageFile;

// function listenFileSelect() {
//     // listen for file selection
//     var fileInput = document.getElementById("mypic-input"); // pointer #1
//     const image = document.getElementById("mypic-goes-here"); // pointer #2

//     fileInput.addEventListener('change', function (e) {
//         ImageFile = e.target.files[0];
//         var blob = URL.createObjectURL(ImageFile);
//         image.src = blob; // display this image
//     })
// }
// listenFileSelect();

// function savePost() {
//     alert("Your post has been saved!");
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // User is signed in.
//             // Do something for the user here.
//             var desc = document.getElementById("description").value;
//             db.collection("posts").add({
//                 owner: user.uid,
//                 description: desc,
//                 last_updated: firebase.firestore.FieldValue
//                     .serverTimestamp() //current system time
//             }).then(doc => {
//                 console.log("Post document added!");
//                 console.log(doc.id);
//                 saveNewPostID(user.uid, doc.id);
//                 //uploadPic(doc.id);
//             })
//         } else {
//             // No user is signed in.
//             console.log("Error: no user is logged in");
//         }
//     });
// }

// function uploadPic(postDocID) {
//     console.log("inside uploadPic " + postDocID);
//     var storageRef = storage.ref("images/" + postDocID + ".jpg");

//     storageRef.put(ImageFile)   //global variable ImageFile

//                    // AFTER .put() is done
//         .then(function () {
//             console.log('Uploaded to Cloud Storage.');
//             storageRef.getDownloadURL()

//                  // AFTER .getDownloadURL is done
//                 .then(function (url) { // Get URL of the uploaded file
//                     console.log("Got the download URL.");
//                     db.collection("posts").doc(postDocID).update({
//                             "image": url // Save the URL into users collection
//                         })

//                          // AFTER .update is done
//                         .then(function () {
//                             console.log('Added pic URL to Firestore.');
//                         })
//                 })
//         })
//         .catch((error) => {
//              console.log("error uploading to cloud storage");
//         })
// }

// function saveNewPostID(userUID, postDocID) {
//     console.log("inside saveNewPostID");
//     console.log(userUID);
//     console.log(postDocID);
//     db.collection("users")
//     .doc(userUID)
//     .update({
//         posts: firebase.firestore.FieldValue.arrayUnion(postDocID)
//     })
//     .then(() =>
//         console.log("Saved to user's document!"))
//     .catch((error) => {
//         console.error("Error writing document: ", error);
//     });

//     db.collection("users").doc(userUID).set({
//             myposts: firebase.firestore.FieldValue.arrayUnion(postDocID)
//         }, {
//             merge: true
//         })
//         .then(() =>
//             console.log("Saved to user's document!"))
//         .catch((error) => {
//             console.error("Error writing document: ", error);
//         });
// }

// function showMyPosts() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // User is signed in.
//             // Do something for the user here.
//             db.collection("users").doc(user.uid).get()
//                 .then(doc => {
//                     console.log(doc.data().myposts);
//                     myposts.forEach(item => {
//                         console.log(item);
//                     })
//                 })
//         } else {
//             // No user is signed in.
//             console.log("Error: no user is logged in");
//         }
//     });
// }
// showMyPosts();
