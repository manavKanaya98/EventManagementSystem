
# README

This file provides instructions on how to set up and run this project.

## Overview

This is a project intended for practising creating full-stack applications using React for the front-end and 
Node.js/Express for the back-end. The website enables users to register and log in to their accounts and be able to create and 
manage events.

## Installations

Ensure the following are installed on your machine

- Node.js 
- npm (included when installing Node.js)
- MongoDB (and optionally MongoDB compass for the GUI)

## Local Configuration

To obtain a local copy of this project run the command `git clone https://github.com/manavKanaya98/EventManagementSystem.git` in a terminal.

Then, navigate into the project directory `cd EventManagementSystem`.

Now, navigate into the **server** directory using `cd server`.

Then install the dependencies for the back-end using the command `npm install`.

Now, create a **.env** file within the **server** directory and copy the content from the **.env.example** file, replacing "your-database-name" in the MONGO_URI with the chosen name for your MongoDB database.

Finally, navigate to the **client** directory using `cd ../client` and install the necessary dependencies for the React front-end using `npm install`.

## Running this project

Firstly, navigate into the **server** directory `cd ../server`.
Next, start the back-end of the system by using the command `node index.js`.

Then, open a new terminal instance and navigate into the **client** directory of the project using the command `cd EventManagementSystem/client`.
Now, run the front-end by using the command `npm start`.

The application will now be available to view on the URL http://localhost:3000 in a browser.

