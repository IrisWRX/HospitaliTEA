var currentUser;

function populateUserInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var userGender = userDoc.data().gender;
        var userBirthday = userDoc.data().birthday;
        var userWork = userDoc.data().work;
        var userPhone = userDoc.data().phone;
        var userEmail = userDoc.data().email;
        // var userAddress = userDoc.data().address;
        // var userAddress2 = userDoc.data().address2;
        // var userCity = userDoc.data().city;
        // var userProvince = userDoc.data().province;
        // var userZip = userDoc.data().zip;

        //if the data fields are not empty, then write them into the form.
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userGender != null) {
          document.getElementById("genderInput").value = userGender;
        }
        if (userBirthday != null) {
          document.getElementById("birthdayInput").value = userBirthday;
        }
        if (userWork != null) {
          document.getElementById("workInput").value = userWork;
        }
        if (userPhone != null) {
          document.getElementById("phoneInput").value = userPhone;
        }
        if (userEmail != null) {
          document.getElementById("emailInput").value = userEmail;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it
populateUserInfo();

function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
}

function saveUserInfo() {
  userName = document.getElementById("nameInput").value;
  userGender = document.getElementById("genderInput").value;
  userBirthday = document.getElementById("birthdayInput").value;
  userWork = document.getElementById("workInput").value;
  userPhone = document.getElementById("phoneInput").value;
  userEmail = document.getElementById("emailInput").value;
  //   userAddress = document.getElementById("inputAddress").value;
  //   userAddress2 = document.getElementById("inputAddress2").value;
  //   userCity = document.getElementById("inputCity").value;
  //   userProvince = document.getElementById("inputCity").value;
  //   userZip = document.getElementById("inputZip").value;

  currentUser
    .update({
      name: userName,
      gender: userGender,
      birthday: userBirthday,
      work: userWork,
      phone: userPhone,
      email: userEmail,
    })
    .then(() => {
      console.log("Document successfully updated!");
    });
  document.getElementById("personalInfoFields").disabled = true;
}
