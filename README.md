
# LumenSync
> Automate and Control Your Hue Lightbulbs


## General Info
LumenSync is a minimalistic Phillips Hue control/scheduling application built with a React frontend, Node/Express backend, and PostgreSQL database.

## Demo Video
[LumenSync on YouTube](https://youtu.be/Igzv4thhg1c)

## Technologies

* Node - v 15.13.0
  * jsonwebtoken
  * bcrypt

* React - v 17.0.2
  * React Router
  * Material UI
  * Spacetime

* HTML
* CSS


## Setup
To utilize LumenSync, install locally using the following commands:
```
git clone git@github.com:natekcroteau/LumenSync-app-frontend.git
git clone git@github.com:natekcroteau/LumenSync-app-backend.git
```

Frontend Directory Setup:
```
npm install
```

Backend Directory Setup:
```
npm install
```
-initiate and connect postgreSQL database, updating knexfile.js



Start the backend, then frontend server with the following command in the respective directory:
```
npm start
```


## Code Example
```
const submitForm = (event) => {
    setSubmitted(true)
    event.preventDefault()
    const convertedBri = Math.trunc(prepareBri())
    const convertedCT = Math.trunc(prepareCT())
    fetch(`https://${hueAddress}/api/${hueUsername}/schedules`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": nameInput,
            "command": {
                "address": `/api/${hueUsername}/groups/${lightGroup}/action`,
                "method": "PUT",
                "body": {"on": onOff, "bri": `${convertedBri}`, "ct": `${convertedCT}`}
            },
            "localtime": `${prepareDateTime()}`,
            "autodelete": false
        })
    })
}
```

## Features
* Create users and sign-in with authentication
* User must connect Hue Bridge 

* The user is able to remove authentication by logging out





## Status
Project functions as intended for a local user


## Inspiration



## Contact
Created by [Nate Croteau](https://github.com/natekcroteau)
