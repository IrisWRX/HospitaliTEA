function goBack() {
  window.location.href = "list.html";
}

// Get the document ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const documentId = urlParams.get('id');

db.collection("shelters").doc(documentId).get().then((doc) => {
  if (doc.exists) {
    // Display the document's data on the information page
    const data = doc.data();
    // Use the data to populate the information page, e.g., display the name, distance, etc.
  } else {
    console.log("No such document!");
  }
}).catch(error => {
  console.log("Error getting document:", error);
});
