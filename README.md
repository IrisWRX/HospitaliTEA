# Project Title

## 1. Project Description

HospitaliTEA is a web app that helps users find accommodation during extreme weather conditions while also allowing users to provide shelter for community members in need.

## 2. Names of Contributors

- Alex
- Iris
- Steven

## 3. Technologies and Resources Used

- HTML5
- CSS3
- JavaScript
- jQuery
- Bootstrap
- Node.js
- Express.js
- Mapbox API 
- Firebase  

## 4. Complete setup/installion/usage

- Clone the repository to your local machine.
- Open the project folder in your code editor.
- Set up Firebase for the project by creating a new Firebase project in the Firebase console and copying the configuration details into the firebaseAPI_HospitaliTea.js file.
- Create a Mapbox account and obtain an API key. Replace the placeholder text in the mapboxAPI.js file with your API key.
- Open the index.html file in your web browser to use the application.
- To use the full functionality of the app, you must create an account and sign in. Click the "Get Started" button on the landing page to sign up.
- Once you have signed in, you can search for available shelters near your location or offer a shelter for community members in need.

Note: This project is designed to be used on mobile devices, so it is recommended that you test the application on a mobile device or emulator.

## 5. Known Bugs and Limitations

- The map pins, list, and information page can be slow to load.
- The app may not work properly if your device's location services are turned off.
- When the status of a shelter is changed to "Unavailable", it can still be shown as pins and list contents.

## 6. Features for Future

- Enhance the design to make them more visually appealing and user-friendly.
- Implement search function that enables users to search for shelters based on location.
- Hide shelters with an "Unavailable" status from the map pins and list contents.
- Develop a message feature that allows hosts and guests to communicate with each other directly within the app.

## 7. Contents of Folder

Content of the project folder:

```
Top level of project folder:
├── app                      # Folder for HTML files for the different pages of the app.
├── node_modules             # Folder for the installed Node.js modules that the project depends on.
├── public                   # Folder for public files for the app, such as CSS, images, and JavaScript files.
├── text                     # Folder for text files used in the app, such as the footer and navbar.
├── .gitignore               # Git ignore file
├── package-lock.json        # Package lock file
├── package.json             # Package file
├── README.md                # Readme file
└── server.js                # Server file

It has the following subfolders and files:
├── app                      # Folder for HTML files for the different pages of the app.
    /home.html
    /index.html
    /information.html
    /list.html
    /login.html
    /makeposts.html
    /profile.html
    /showposts.html
├── node_modules             # Folder for the installed Node.js modules that the project depends on.
├── public                   # Folder for public files for the app, such as CSS, images, and JavaScript files.
    ├── css                  # Folder for css files
        /home.css
        /index.css
        /information.css
        /list.css
        /login.css
        /makeposts.css
        /profile.css
        /showposts.css
        /style.css
    ├── img                  # Folder for img files
        /logo2.png
    ├── js                   # Folder for js files
        /authentication.js
        /firebaseAPI_HospitaliTea.js
        /home.js
        /index.js
        /information.js
        /list.js
        /main.js
        /makeposts.js
        /profile.js
        /showposts.js
        /skeleton.js
├── text                     # Folder for text files used in the app, such as the footer and navbar.
    /footer.html
    /navbar.html
├── .gitignore               # Folder for git repo
├── package-lock.json        # Package lock file
├── package.json             # Package file
├── README.md                # Readme file
└── server.js                # Server file

```
