function goBack() {
  window.location.href = "list.html";
}

// Get the document ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const documentId = urlParams.get("id");

db.collection("posts")
  .doc(documentId)
  .get()
  .then((doc) => {
    if (doc.exists) {
      // Display the document's data on the information page
      const data = doc.data();
      // Use the data to populate the information page

      // Display the image
      document.getElementById("shelter-image").src = data.image;

      // Display the name
      document.getElementById(
        "shelter-name"
      ).textContent = `Hosted by ${data.name}`;

      // Display the address
      const address = data.address;
      const addressElement = document.createElement("p");
      addressElement.innerHTML = `<strong>Address:</strong> ${address}`;
      document
        .getElementById("shelter-address")
        .insertAdjacentElement("beforebegin", addressElement);

      // Display the status
      const status = data.status;
      const statusElement = document.createElement("p");
      statusElement.innerHTML = `<strong>Status:</strong> ${status}`;
      document
        .getElementById("shelter-status")
        .insertAdjacentElement("afterend", statusElement);

      // Display the amenities
      const amenities = data.amenities;
      const amenitiesArray = Object.keys(amenities); // Convert amenities object to an array
      const amenitiesList = document.createElement("ul");
      amenitiesArray.forEach((amenity) => {
        const listItem = document.createElement("li");
        listItem.textContent = amenity;
        amenitiesList.appendChild(listItem);
      });
      document.getElementById("shelter-amenities").appendChild(amenitiesList);

      // Display the email
      document.getElementById(
        "shelter-email"
      ).innerHTML = `<strong>Email:</strong> ${data.email}`;
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
