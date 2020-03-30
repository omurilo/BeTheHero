### Be The Hero - An application coded on Omnistack Week 11, however, i decided to do it using Typescript.

*His goal is to help ONGs have a place to share their actions that need financial assistance.*

The objective for this project was development of a backend (for the management of all informations), frontend (for ongs insert yours actions) and an mobile app (for all users view and Be The Hero with an action).

### Techs:
##### :sparkles: JavaScript was the language used throughout the project :revolving_hearts:

* Node.js on backend, with a Databases SQLite and PostgreSQL, for development and production environments sucessively.
  * Bull (with Redis) used for queue management (for email service).
  * Bcrypt and JsonWebToken (JWT) for Authentication and Authorization

* ReactJS on frontend and React Native on mobile with Redux, Redux Saga, Redux Sauce and Immutable.js to state management, Style Components and UnForm :revolving_hearts: to more beautiful interface.

### First steps

> # It is necessary to have
> - Node.js v12+ installed
> - npm or yarn :revolving_hearts:
> - Android SDK and JDK8+
> - Cocoapods for Mac users
> - Docker and Docker Compose

### The first thing is install the dependencies
  
```js
cd backend && yarn
cd frontend && yarn
cd mobile && yarn
```

### Then, configure environment files

>  * backend/.env
>  * frontend/src/services/api/index.js
>  * mobile/src/services/api/index.js

### And let's go!

```js
docker-compose up -d
// on another command line
cd mobile && yarn react-native run-android or yarn react-native run-ios
```


***

*If everything goes well, now the system will be just waiting for you*