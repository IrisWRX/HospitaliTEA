// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Declare an object named uiConfig to hold configuration settings for the FirebaseUI sign-in widget
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;
      if (authResult.additionalUserInfo.isNewUser) {
        const newUserRef = db.collection("users").doc(user.uid);
        newUserRef
          .set({
            name: user.displayName,
            email: user.email,
          })
          .then(() => {
            console.log("New user added to firestore");
            window.location.assign("home.html");
          })
          .catch(function (error) {
            console.log("Error adding new user: ", error);
          });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      document.getElementById("loader").style.display = "none";
    },
  },

  signInFlow: "popup",
  signInSuccessUrl: "home.html",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  tosUrl: "<your-tos-url>",
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

// Initialize the FirebaseUI sign-in widget with the specified configuration
ui.start("#firebaseui-auth-container", uiConfig);
