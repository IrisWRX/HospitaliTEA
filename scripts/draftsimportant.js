function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("shelterCardTemplate");
  
    db.collection(collection).get()   //the collection called "hikes"
        .then(allShelters=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allShelters.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var distance = doc.data().distance;  // get value of the "details" key
                var status = doc.data().status;    //get unique ID to each hike to be used for fetching right image
                // var hikeLength = doc.data().length; //gets the length field
                let newcard = cardTemplate.content.cloneNode(true);
  
                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-distance').innerHTML = distance;
                newcard.querySelector('.card-status').innerHTML = status;
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