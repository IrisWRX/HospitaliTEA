function showMap() {
  // Defines basic mapbox data
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ";
  const map = new mapboxgl.Map({
    container: "map", // Container ID
    style: "mapbox://styles/mapbox/streets-v11", // Styling URL
    center: [-123.00084927333764, 49.24961675108895], // Starting position
    zoom: 10, // Starting zoom
  });

  function fetchCoordinatesFromAddress(address, accessToken) {
    return fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          return {
            lat: data.features[0].center[1],
            lng: data.features[0].center[0],
          };
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error);
        return null;
      });
  }

  // Add user controls to map
  map.addControl(new mapboxgl.NavigationControl());

  // Adds map features
  map.on("load", () => {
    // Defines map pin icon for events
    map.loadImage(
      "https://cdn.iconscout.com/icon/free/png-256/pin-locate-marker-location-navigation-16-28668.png",
      (error, image) => {
        if (error) throw error;

        // Add the image to the map style.
        map.addImage("eventpin", image); // Pin Icon

        // Read all user documents from the "users" collection
        db.collection("users")
          .get()
          .then(async (allUsers) => {
            const features = []; // Defines an empty array for information to be added to

            for (const userDoc of allUsers.docs) {
              // Read posts from the "posts" subcollection of the current user
              const allEvents = await userDoc.ref.collection("posts").get();
              for (const doc of allEvents.docs) {
                const address = doc.data().address;
                const coordinates = await fetchCoordinatesFromAddress(
                  address,
                  "pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ" // Replace with your Mapbox access token
                );

                if (coordinates) {
                  const post_name = `Hosted by ${doc.data().name}`;
                  const status = `Status: ${doc.data().status}`;

                  // Pushes information into the features array
                  features.push({
                    type: "Feature",
                    properties: {
                      // description: `<strong>${post_name}</strong><p>${status}</p> <br> <a href="/information?userId=${userDoc.id}&postId=${doc.id}" target="_blank" title="Opens in a new window">Read more</a>`,
                      description: `<strong>${post_name}</strong><p>${status}</p> <br> <span class="read-more" data-url="/information?userId=${userDoc.id}&postId=${doc.id}">Read more</span>`,
                    },
                    geometry: {
                      type: "Point",
                      coordinates: [coordinates.lng, coordinates.lat],
                    },
                  });
                  console.log(
                    `Generated URL: /information?userId=${userDoc.id}&postId=${doc.id}`
                  );
                }
              }
            }
            // Adds features as a source to the map
            map.addSource("places", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: features,
              },
            });

            // Creates a layer above the map displaying the pins
            map.addLayer({
              id: "places",
              type: "symbol",
              // source: 'places',
              source: "places",
              layout: {
                "icon-image": "eventpin", // Pin Icon
                "icon-size": 0.1, // Pin Size
                "icon-allow-overlap": true, // Allows icons to overlap
              },
            });

            // Map On Click function that creates a popup, displaying previously defined information from "events" collection in Firestore
            map.on("click", "places", (e) => {
              // Copy coordinates array.
              const coordinates = e.features[0].geometry.coordinates.slice();
              const description = e.features[0].properties.description;

              // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              // new mapboxgl.Popup()
              //   .setLngLat(coordinates)
              //   .setHTML(description)
              //   .addTo(map);
              const popup = new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);

              // Add an event listener for the "Read more" span element
              const readMoreSpan = document.querySelector(
                ".mapboxgl-popup .read-more"
              );
              readMoreSpan.addEventListener("click", (event) => {
                event.preventDefault();
                const url = event.target.getAttribute("data-url");
                window.location.href = url;
              });
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on("mouseenter", "places", () => {
              map.getCanvas().style.cursor = "pointer";
            });

            // Defaults cursor when not hovering over the places layer
            map.on("mouseleave", "places", () => {
              map.getCanvas().style.cursor = "";
            });
          });

        // Add the image to the map style.
        map.loadImage(
          "https://cdn-icons-png.flaticon.com/512/61/61168.png",
          (error, image) => {
            if (error) throw error;

            // Add the image to the map style with width and height values
            map.addImage("userpin", image, { width: 10, height: 10 });

            // Adds user's current location as a source to the map
            navigator.geolocation.getCurrentPosition((position) => {
              const userLocation = [
                position.coords.longitude,
                position.coords.latitude,
              ];
              console.log(userLocation);
              if (userLocation) {
                map.addSource("userLocation", {
                  type: "geojson",
                  data: {
                    type: "FeatureCollection",
                    features: [
                      {
                        type: "Feature",
                        geometry: {
                          type: "Point",
                          coordinates: userLocation,
                        },
                        properties: {
                          description: "Your location",
                        },
                      },
                    ],
                  },
                });

                // Creates a layer above the map displaying the user's location
                map.addLayer({
                  id: "userLocation",
                  type: "symbol",
                  source: "userLocation",
                  layout: {
                    "icon-image": "userpin", // Pin Icon
                    "icon-size": 0.05, // Pin Size
                    "icon-allow-overlap": true, // Allows icons to overlap
                  },
                });

                // Map On Click function that creates a popup displaying the user's location
                map.on("click", "userLocation", (e) => {
                  // Copy coordinates array.
                  const coordinates =
                    e.features[0].geometry.coordinates.slice();
                  const description = e.features[0].properties.description;

                  new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
                });

                // Change the cursor to a pointer when the mouse is over the userLocation layer.
                map.on("mouseenter", "userLocation", () => {
                  map.getCanvas().style.cursor = "pointer";
                });

                // Defaults
                // Defaults cursor when not hovering over the userLocation layer
                map.on("mouseleave", "userLocation", () => {
                  map.getCanvas().style.cursor = "";
                });
              }
            });
          }
        );
      }
    );
  });
}

// Call the function to display the map with the user's location and event pins
showMap();
