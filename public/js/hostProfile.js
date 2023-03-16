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
                    var userGender = userDoc.data().gender;
                    var userOccupation = userDoc.data().occupation;
                    var userContact = userDoc.data().contact;
                    var userHost = userDoc.data().host;
                    var userVacancy = userDoc.data().vacancy;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userAddress != null) {
                        document.getElementById("inputAddress").value = userAddress;
                    }
                    if (userGender != null) {
                        document.getElementById("inputGender").value = userGender;
                    }
                    if (userOccupation != null) {
                        document.getElementById("inputOccupation").value = userOccupation;
                    }
                    if (userContact != null) {
                        document.getElementById("inputContact").value = userContact;
                    }
                    if (userHost != null) {
                        document.getElementById("inputHost").value = userHost;
                    }
                     if (userVacancy != null) {
                        document.getElementById("inputVacancy").value = userVacancy;
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
    userGender = document.getElementById('inputGender').value;
    userOccupation = document.getElementById('inputOccupation').value;
    userContact = document.getElementById('inputContact').value;
    userHost = document.getElementById('inputHost').value;
    userVacancy = document.getElementById('inputVacancy').value;

    currentUser.update({
        name: userName,
        address: userAddress,
        gender: userGender,
        occupation: userOccupation,
        contact: userContact,
        host: userHost,
        vacancy: userVacancy
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('personalInfoFields').disabled = true;
}

