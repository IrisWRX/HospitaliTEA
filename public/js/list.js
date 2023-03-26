async function fetchCoordinatesFromAddress(address, accessToken) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const coordinates = {
        lng: data.features[0].center[0],
        lat: data.features[0].center[1],
      };
      return coordinates;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}

async function getImageUrl(folder, imageName) {
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(`${folder}/${imageName}`);
  const url = await imageRef.getDownloadURL();
  return url;
}

function goBack() {
  window.location.href = "home.html";
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

async function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("shelterCardTemplate");

  // Get user's location
  const userLocation = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
      (error) => reject(error)
    );
  });

  db.collection(collection)
    .get()
    .then(async (allPosts) => {
      // Calculate distances and sort shelters
      const sheltersWithDistances = (
        await Promise.all(
          allPosts.docs.map(async (doc) => {
            const address = doc.data().address;
            const coordinates = await fetchCoordinatesFromAddress(
              address,
              "pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ"
            );

            if (coordinates) {
              const distance = calculateDistance(
                userLocation.lat,
                userLocation.lon,
                coordinates.lat,
                coordinates.lng
              );

              return { doc, distance };
            } else {
              return null;
            }
          })
        )
      )
        .filter((shelter) => shelter !== null)
        .sort((a, b) => a.distance - b.distance);

      // Display sorted shelters
      for (const { doc, distance } of sheltersWithDistances) {
        const formattedTitle = `Hosted by ${doc.data().name}`;
        const formattedStatus = `Status: ${doc.data().status}`;
        const formattedDistance = `Distance: ${distance.toFixed(2)} km`;
        let newcard = cardTemplate.content.cloneNode(true);

        newcard.querySelector(".card-title").innerHTML = formattedTitle;
        newcard.querySelector(".card-distance").innerHTML = formattedDistance;
        newcard.querySelector(".card-status").innerHTML = formattedStatus;
        const imageUrl = await getImageUrl("images", `${doc.id}.jpg`);
        newcard.querySelector(".card-img").src = imageUrl;

        // Attach the event listener to the new card element
        newcard.querySelector(".card1").addEventListener("click", () => {
          const docId = doc.id;
          // Take the user to a new page where they can view more information about the document
          window.location.href = `information?id=${docId}`;
        });

        document.getElementById(collection + "-go-here").appendChild(newcard);
      }
    });
}

displayCardsDynamically("posts"); //input param is the name of the collection
