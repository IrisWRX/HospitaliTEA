function goBack() {
  window.location.href = "home.html";
}
  
  function writeShelters() {
    //define a variable for the collection you want to create in Firestore to populate data
    var sheltersRef = db.collection("shelters");

    sheltersRef.add({
        code: "Am01",
        name: "Hosted by Louise Belcher", 
        distance: "Distance: 500m",
        status: "Status: 2 spots left",
        lat: 49.25349699080102,
        lng: -123.0459449494759,
        email: "LouiseB@gmail.com",
        // city: "Burnaby",
        // province: "BC",
        // level: "easy",
				// details: "A lovely place for lunch walk",
        // length: 10,          //number value
        // hike_time: 60,       //number value
        // last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    sheltersRef.add({
        code: "BBY01",
        name: "Hosted by Diane Nguyen", 
        distance: "Distance: 800m",
        status: "Status: 1 spot left",
        lat: 49.252905588383044, 
        lng: -123.04478857997705, 
        email: "DianeN@gmail.com",
    });
    sheltersRef.add({
        code: "NV01",
        name: "Hosted by Beth Smith", 
        distance: "Distance: 900m",
        status: "Status: 3 spots left",
        lat: 49.25258388804173, 
        lng: -123.04474592035444, 
        email: "BethS@gmail.com",
    });
    sheltersRef.add({
      code: "NV02",
      name: "Hosted by Carolyn Munro", 
      distance: "Distance: 990m",
      status: "Status: 1 spots left",
      lat: 49.251933701113074, 
      lng: -123.0458459461559, 
      email: "CarolynM@gmail.com",
    });
    sheltersRef.add({
    code: "NV03",
    name: "Hosted by Nana Fukumoto", 
    distance: "Distance: 1500m",
    status: "Status: 4 spots left",
    lat: 49.25056556018803, 
    lng: -123.0486517431532,
    email: "NanaF@gmail.com",
});
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("shelterCardTemplate");

  db.collection(collection).get()   //the collection called "hikes"
      .then(allShelters=> {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          allShelters.forEach(doc => { //iterate thru each doc
              var title = doc.data().name;       // get value of the "name" key
              var distance = doc.data().distance;  // get value of the "details" key
              var status = doc.data().status;    
              let newcard = cardTemplate.content.cloneNode(true);

              //update title and text and image
              newcard.querySelector('.card-title').innerHTML = title;
              newcard.querySelector('.card-distance').innerHTML = distance;
              newcard.querySelector('.card-status').innerHTML = status;
              newcard.querySelector('.card-img').src = `/img/${doc.data().code}.jpg`; 

              //attach to gallery, Example: "hikes-go-here"
              document.getElementById(collection + "-go-here").appendChild(newcard);

              // Add a click event listener to the card and store the shelter ID in local storage
              newcard.addEventListener('click', () => {
                localStorage.setItem('shelterId', doc.id);
                window.location.href = `information.html`;
              });
          })
      })
}

displayCardsDynamically("shelters");  //input param is the name of the collection
