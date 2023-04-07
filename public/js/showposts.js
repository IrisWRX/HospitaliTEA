// Displays all posts created by the currently signed-in user
function displayUserPosts() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      console.log("No user is signed in");
      window.location.href = "login.html";
      return;
    }

    // Retrieves the user's posts from the Firestore database and saves them in query snapshot.
    const postsContainer = document.getElementById("posts-go-here");
    const postCardTemplate = document.getElementById("postCardTemplate");
    const currentUser = firebase.firestore().collection("users").doc(user.uid);
    const querySnapshot = await currentUser.collection("posts").get();

    // Iterates through the user's posts in Firestore
    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const card = postCardTemplate.content.cloneNode(true);

      card.querySelector(".card-title").textContent = post.title;
      card.querySelector(".card-status").textContent = post.status;
      card.querySelector(".card-img-top").src =
        post.image || "https://via.placeholder.com/150";

      // Adds event listener to the button on the post card
      // that toggles the status of the post and updates the status in Firestore.
      const changeStatusBtn = card.querySelector(".change-status-btn");
      const deleteButton = card.querySelector(".delete-button");
      const cardStatus = card.querySelector(".card-status");

      changeStatusBtn.addEventListener("click", async () => {
        post.status = post.status === "Available" ? "Unavailable" : "Available";
        cardStatus.textContent = post.status;

        await doc.ref.update({ status: post.status });
      });

      // Adds event listener to the delete button in the post card
      deleteButton.addEventListener("click", () => {
        const postId = deleteButton.dataset.postId;
        const modal = document.getElementById("delete-modal");
        const cancelBtn = document.getElementById("cancel-btn");
        const confirmDeleteButton = document.getElementById("confirm-delete");
        modal.style.display = "block";

        cancelBtn.addEventListener("click", () => {
          modal.style.display = "none";
          document.getElementById("confirm-delete").checked = false;
        });

        window.addEventListener("click", (event) => {
          if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("confirm-delete").checked = false;
          }
        });

        confirmDeleteButton.addEventListener("click", async () => {
          await doc.ref.delete();
          modal.remove();
          location.reload();
          modal.style.display = "none";
        });
      });

      deleteButton.dataset.postId = doc.id;

      postsContainer.appendChild(card);
    });
  });
}

displayUserPosts();
