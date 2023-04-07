# Project Title

## 1. Project Description

Our team, BBY 15, is developing an interactive mobile app, HospitaliTEA, that helps users find accommodation when stranded due to extreme weather conditions; while also allowing users to provide shelter for community members in need.

## 2. Names of Contributors

List team members and/or short bio's here.

- Hi my name is Steven! I'm excited to work on this project!
- Hi my name is Iris. I'm excited to work on this project.
- Hi my name is Alex. I'm exicited about this project.

## 3. Technologies and Resources Used

List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.

- HTML 5
- CSS
- JavaScript
- Bootstrap v5.1.3
- Mapbox GL JS v2.7.0
- jQuery v3.5.1
- Firebase v8.10.0 (Authentication, Firestore, Storage)
- Font Awesome v5.15.4
- Logo image (/img/logo2.png)

## 4. Complete setup/installion/usage

State what a user needs to do when they come to your project. How do others start using your code or application?
Here are the steps.

- Clone the repository to your local machine.
- Open the project folder in your code editor.
- Set up Firebase for the project by creating a new Firebase project in the Firebase console and copying the configuration details into the firebaseAPI_HospitaliTea.js file.
- Create a Mapbox account and obtain an API key. Replace the placeholder text in the mapboxAPI.js file with your API key.
- Open the index.html file in your web browser to use the application.
- To use the full functionality of the app, you must create an account and sign in. Click the "Get Started" button on the landing page to sign up.
- Once you have signed in, you can search for available shelters near your location or offer a shelter for community members in need.

Note: This project is designed to be used on mobile devices, so it is recommended that you test the application on a mobile device or emulator.

## 5. Known Bugs and Limitations

Here are some known bugs:

- The map pins, list and information page can be slow to load.
- The app may not work properly if your device's location services are turned off.
- When the status of a shelter is changed to "Unavailable", it can still be shown as pins and list contents.
- The pop-up option box for selecting the status of the shelter when creating a post is wider than the screen size of a mobile phone.

## 6. Features for Future

What we'd like to build in the future:

- Enhancing the design of key pages such as the landing, post, my posts, and profile pages to make them more visually appealing and user-friendly.
- Implementing a search function that enables users to search for shelters based on location.
- Hiding shelters with an "Unavailable" status from the map pins and list contents to avoid confusion.
- Developing a messaging feature that allows hosts and guests to communicate with each other directly within the app.

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
