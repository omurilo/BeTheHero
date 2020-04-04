
<h1 align="center">
    <img alt="BeTheHero" title="#BeTheHero" src=".github/logo-be-the-hero.svg" width="250px" />
</h1>

<h4 align="center">
	:construction: 🚀 Semana OmniStack 11.0 In progress.. :construction:
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/murilokaos/BeTheHero?color=%23007acc">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/murilokaos/BeTheHero">
	
  <a href="https://www.linkedin.com/in/omurilo/">
    <img alt="Made by Murilo Henrique" src="https://img.shields.io/badge/made%20by-Murilo Henrique-%23f7d353">
  </a>

  <a href="https://github.com/murilokaos/BeTheHero/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/murilokaos/BeTheHero?color=24292e">
  </a>

  <a aria-label="Completed" href="https://rocketseat.com.br/week-11">
    <img src="https://img.shields.io/badge/OmniStack-done-green?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAALVBMVEVHcExxWsF0XMJzXMJxWcFsUsD///9jRrzY0u6Xh9Gsn9n39fyMecy0qd2bjNJWBT0WAAAABHRSTlMA2Do606wF2QAAAGlJREFUGJVdj1cWwCAIBLEsRU3uf9xobDH8+GZwUYi8i6ucJwrxKE+7D0G9Q4vlYqtmCSjndr4CgCgzlyFgfKfKCVO0LrPKjmiqMxGXkJwNnXskqWG+1oSM+BSwD8f29YLNjvx/OQrn+g99oQSoNmt3PgAAAABJRU5ErkJggg==&color=7159c1"></img>
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/murilokaos/BeTheHero/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/murilokaos/BeTheHero?style=social">
  </a>
</p>

<p align="center">
  <a href="https://insomnia.rest/run/?label=SemanaOmnistack11&uri=https://raw.githubusercontent.com/murilokaos/BeTheHero/master/backend/docs-29-03-2020.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

<p align="center">
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-Technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How to use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## 💻 Project

### Be The Hero - An application coded on Omnistack Week 11, however, i decided to do it using Typescript.

*His goal is to help ONGs have a place to share their actions that need financial assistance.*

The objective for this project was the development of a backend (for the management of all informations), frontend (for ongs to insert their actions) and an mobile app (for all users view and Be The Hero with an action).

## :rocket: Technologies:
##### :sparkles: JavaScript was the language used throughout the project :revolving_hearts:

* [Node.js](https://nodejs.org/en/) on backend, with a Databases SQLite and PostgreSQL, for development and production environments sucessively.
  * Bull (with Redis) used for queue management (for email service).
  * Bcrypt and JsonWebToken (JWT) for Authentication and Authorization

* [React](https://reactjs.org) on frontend and [React Native](https://facebook.github.io/react-native/) on mobile with Redux, Redux Saga, Redux Sauce and Immutable.js to state management, Style Components and UnForm :revolving_hearts: to more beautiful interface.

## 🔖 Layout

Para acessar o layout utilize a ferramenta [Figma](https://www.figma.com/file/2C2yvw7jsCOGmaNUDftX9n/Be-The-Hero---OmniStack-11?node-id=0%3A1).

## :information_source: How To Use

> ## It is necessary to have
> - Node.js v12+ installed
> - npm or yarn :revolving_hearts:
> - Android SDK and JDK8+
> - Cocoapods for Mac users
> - Docker and Docker Compose

### The first thing is install the dependencies
  
```bash
cd backend && yarn
cd frontend && yarn
cd mobile && yarn
```

### Then, configure environment files

>  * backend/.env
>  * frontend/src/services/api/index.js
>  * mobile/src/services/api/index.js

### And let's go!

```bash
docker-compose up -d
// on another command line
cd mobile && yarn react-native run-android or yarn react-native run-ios
```


## 📝 License

This project is under the MIT license. See the LICENSE for details.

***

*If everything goes well, now the system will be just waiting for you*

##### Made with ♥ by Murilo Henrique 👋 [Get in Touch](https://www.linkedin.com/in/omurilo)
