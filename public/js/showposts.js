function displayUserPosts() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      console.log("No user is signed in");
      window.location.href = "login.html";
      return;
    }

    const postsContainer = document.getElementById("posts-go-here");
    const postCardTemplate = document.getElementById("postCardTemplate");
    const currentUser = firebase.firestore().collection("users").doc(user.uid);
    const querySnapshot = await currentUser.collection("posts").get();

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const card = postCardTemplate.content.cloneNode(true);

      card.querySelector(".card-title").textContent = `Hosted by you`;
      card.querySelector(".card-status").textContent = post.status;
      card.querySelector(".card-img-top").src =
        post.image || "https://via.placeholder.com/150";

      const changeStatusBtn = card.querySelector(".change-status-btn");
      const cardStatus = card.querySelector(".card-status");

      changeStatusBtn.addEventListener("click", async () => {
        post.status = post.status === "Available" ? "Unavailable" : "Available";
        cardStatus.textContent = post.status;

        // Update the status in Firestore
        await doc.ref.update({ status: post.status });
      });

      postsContainer.appendChild(card);
    });
  });
}

displayUserPosts();
