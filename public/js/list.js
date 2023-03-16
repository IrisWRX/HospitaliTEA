function goBack() {
    window.history.back();
  }
  
  function writeShelters() {
    //define a variable for the collection you want to create in Firestore to populate data
    var sheltersRef = db.collection("shelters");

    sheltersRef.add({
        code: "Am01",
        name: "Hosted by Louise Belcher", //replace with your own city?
        distance: "Distance: 500m",
        status: "Status: 2 spots left",
        // city: "Burnaby",
        // province: "BC",
        // level: "easy",
				// details: "A lovely place for lunch walk",
        // length: 10,          //number value
        // hike_time: 60,       //number value
        // lat: 49.2467097082573,
        // lng: -122.9187029619698,
        // last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    sheltersRef.add({
        code: "BBY01",
        name: "Hosted by Diane Nguyenr", //replace with your own city?
        distance: "Distance: 800m",
        status: "Status: 1 spot left",
        // city: "Anmore",
        // province: "BC",
        // level: "moderate",
        // details: "Close to town, and relaxing",
        // length: 10.5,      //number value
        // hike_time: 80,     //number value
        // lat: 49.3399431028579,
        // lng: -122.85908496766939,
        // last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    sheltersRef.add({
        code: "NV01",
        name: "Hosted by Beth Smith", //replace with your own city?
        distance: "Distance: 900m",
        status: "Status: 3 spots left",
        // city: "North Vancouver",
        // province: "BC",
        // level: "hard",
        // details:  "Amazing ski slope views",
        // length: 8.2,        //number value
        // hike_time: 120,     //number value
        // lat: 49.38847101455571,
        // lng: -122.94092543551031,
        // last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
    });
//     sheltersRef.add({
//       code: "NV02",
//       name: "Hosted by Carolyn Munro", //replace with your own city?
//       distance: "Distance: 990m",
//       status: "Status: 1 spots left",
//       // city: "North Vancouver",
//       // province: "BC",
//       // level: "hard",
//       // details:  "Amazing ski slope views",
//       // length: 8.2,        //number value
//       // hike_time: 120,     //number value
//       // lat: 49.38847101455571,
//       // lng: -122.94092543551031,
//       // last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
//   });
//   sheltersRef.add({
//     code: "NV03",
//     name: "Hosted by Nana Fukumoto", //replace with your own city?
//     distance: "Distance: 1500m",
//     status: "Status: 4 spots left",
//     // city: "North Vancouver",
//     // province: "BC",
//     // level: "hard",
//     // details:  "Amazing ski slope views",
//     // length: 8.2,        //number value
//     // hike_time: 120,     //number value
//     // lat: 49.38847101455571,
//     // lng: -122.94092543551031,
//     // last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
// });
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
              var status = doc.data().status;    //get unique ID to each hike to be used for fetching right image
              var hikeCode = doc.data().code;
              // var hikeLength = doc.data().length; //gets the length field
              let newcard = cardTemplate.content.cloneNode(true);

              //update title and text and image
              newcard.querySelector('.card-title').innerHTML = title;
              newcard.querySelector('.card-distance').innerHTML = distance;
              newcard.querySelector('.card-status').innerHTML = status;
              newcard.querySelector('.card-img').src = `./images/${hikeCode}.jpg`; 
              // newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg

              //Optional: give unique ids to all elements for future use
              // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
              // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
              // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

              //attach to gallery, Example: "hikes-go-here"
              document.getElementById(collection + "-go-here").appendChild(newcard);

              //i++;   //Optional: iterate variable to serve as unique ID
          })
      })
}

displayCardsDynamically("shelters");  //input param is the name of the collection