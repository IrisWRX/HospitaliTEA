var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userAddress = userDoc.data().address;
                    var userAddress2 = userDoc.data().address2;
                    var userCity = userDoc.data().city;
                    var userProvince = userDoc.data().province;
                    var userZip = userDoc.data().zip;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userAddress != null) {
                        document.getElementById("inputAddress").value = userAddress;
                    }
                    if (userAddress2 != null) {
                        document.getElementById("inputAddress2").value = userAddress2;
                    }
                    if (userCity != null) {
                        document.getElementById("inputCity").value = userCity;
                    }
                    if (userProvince != null) {
                        document.getElementById("inputProvince").value = userProvince;
                    }
                    if (userZip != null) {
                        document.getElementById("inputZip").value = userZip;
                    }
                })
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
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userAddress = document.getElementById('inputAddress').value;
    userAddress2 = document.getElementById('inputAddress2').value;
    userCity = document.getElementById('inputCity').value;
    userProvince = document.getElementById('inputCity').value;
    userZip = document.getElementById('inputZip').value;

    currentUser.update({
        name: userName,
        address: userAddress,
        address2: userAddress2,
        city: userCity,
        province: userProvince,
        zip: userZip
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('personalInfoFields').disabled = true;
}

