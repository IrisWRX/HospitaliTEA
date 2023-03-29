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

      card.querySelector(".card-title").textContent = post.title;
      card.querySelector(".card-status").textContent = post.status;
      card.querySelector(".card-img-top").src = post.image || "https://via.placeholder.com/150";

      const changeStatusBtn = card.querySelector(".change-status-btn");
      const deleteButton = card.querySelector(".delete-button");
      const cardStatus = card.querySelector(".card-status");

      changeStatusBtn.addEventListener("click", async () => {
        post.status = post.status === "Available" ? "Unavailable" : "Available";
        cardStatus.textContent = post.status;

        // Update the status in Firestore
        await doc.ref.update({ status: post.status });
      });

      deleteButton.addEventListener("click", () => {
        const postId = deleteButton.dataset.postId;
        const modal = document.getElementById("delete-modal");
        const cancelBtn = document.getElementById('cancel-btn');
        const confirmDeleteButton = document.getElementById("confirm-delete");
        modal.style.display = "block";

        cancelBtn.addEventListener('click', () => {
          modal.style.display = 'none';
          document.getElementById('confirm-delete').checked = false;
        });

        window.addEventListener('click', (event) => {
          if (event.target == modal) {
            modal.style.display = 'none';
            document.getElementById('confirm-delete').checked = false;
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
