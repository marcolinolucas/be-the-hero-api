<p align="center"><a href="https://github.com/marcolinolucas/be-the-hero-api" target="_blank" rel="noopener noreferrer"><img width="100" src="https://i.imgur.com/OKsSEaC.png" alt="Be the Hero logo"></a></p>

<p align="center">
  <img src="https://img.shields.io/badge/version-v1.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

---

## Introduction

The idea of the application is join NGOs/ONGs and people who can help financially.
The application consists in a NGOs/ONGs register a incident with a title, description and a value. That way, people can list all incident and choose what they'll help. The next step is contact the NGOs/ONGs by email or whatsapp.

## Dependencies

| Name | Version | Description |
|---------|--------|-------------|
| [express]          | [![express-version]][express-package] | Web application framework |
| [cors]                | [![cors-version]][cors-package] | Enable CORS with various options |
| [knex]             | [![knex-version]][knex-package] | SQL query builder |
| [sqlite3]             | [![sqlite3-version]][sqlite3-package] | Asynchronous, non-blocking SQLite3 |
| [celebrate]             | [![celebrate-version]][celebrate-package] | Express middleware with joi validation |

[express]: https://github.com/expressjs/express
[cors]: https://github.com/expressjs/cors
[knex]: https://github.com/knex/knex
[sqlite3]: https://github.com/mapbox/node-sqlite3
[celebrate]: https://github.com/arb/celebrate

[express-version]: https://img.shields.io/npm/v/express.svg
[cors-version]: https://img.shields.io/npm/v/cors.svg
[knex-version]: https://img.shields.io/npm/v/knex.svg
[sqlite3-version]: https://img.shields.io/npm/v/sqlite3.svg
[celebrate-version]: https://img.shields.io/npm/v/celebrate.svg

[express-package]: https://www.npmjs.com/package/express
[cors-package]: https://www.npmjs.com/package/cors
[knex-package]: https://www.npmjs.com/package/knex
[sqlite3-package]: https://www.npmjs.com/package/sqlite3
[celebrate-package]: https://www.npmjs.com/package/celebrate

## Dev Dependencies

| Name | Version | Description |
|---------|--------|-------------|
| [nodemon]          | [![nodemon-version]][nodemon-package] | Automatically restarting the node application |
| [eslint]                | [![eslint-version]][eslint-package] | Identify and reports patterns found in ECMAScript/JavaScript code |
| [jest]          | [![jest-version]][jest-package] | JavaScript testing solution |
| [supertest]          | [![supertest-version]][supertest-package] | HTTP assertions for tests |
| [cross-env]          | [![cross-env-version]][cross-env-package] | Use environment variables across platforms |

[nodemon]: https://github.com/remy/nodemon
[eslint]: https://github.com/eslint/eslint
[jest]: https://github.com/facebook/jest
[supertest]: https://github.com/visionmedia/supertest
[cross-env]: https://github.com/kentcdodds/cross-env

[nodemon-version]: https://img.shields.io/npm/v/nodemon.svg
[eslint-version]: https://img.shields.io/npm/v/eslint.svg
[jest-version]: https://img.shields.io/npm/v/jest.svg
[supertest-version]: https://img.shields.io/npm/v/supertest.svg
[cross-env-version]: https://img.shields.io/npm/v/cross-env.svg

[nodemon-package]: https://www.npmjs.com/package/nodemon
[eslint-package]: https://www.npmjs.com/package/eslint
[jest-package]: https://www.npmjs.com/package/jest
[supertest-package]: https://www.npmjs.com/package/supertest
[cross-env-package]: https://www.npmjs.com/package/cross-env

## Rocketseat Explication

To check out videos and download files, I uploaded in my Google Drive, visit [OmniStack 11](https://drive.google.com/drive/folders/1nEpuOaWbiNk1D4a7hsJ062_H5w4zAqiD?usp=sharing).

## How to Start

First you need to [clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) or [fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the repository.

With the code in your machine, you'll open the terminal and will install all dependencies.

``` npm i ```

After that you'll start the server.

``` npm start ```

Now all is working. Congratulations!

## Scripts Explication

| Script | Description |
|---------|-------------|
| ``` npm run start ```             | Start the nodemon/server |
| ``` npm run migrations ```             | Start the database (SQLite) |
| ``` npm run lint ```             | Verify patterns code |
| ``` npm run test-dao ```             | Test Dao files |
| ``` npm run test-lib ```             | Test Lib files |
| ``` npm run test-routes ```             | Test Routes files |

## Routes

If you are using [Insomnia](https://insomnia.rest/) or another REST API Client, you can download all routes [here](https://api.myjson.com/bins/169t3g) or in the [Google Drive](https://drive.google.com/file/d/1EaZfI0l6Zo3wKaTcx9PQscOlYgJYcx7O/view).

## Other Repositories of the Project

- [Front-end](https://github.com/marcolinolucas/be-the-hero)
- [Mobile](https://github.com/marcolinolucas/be-the-hero-mobile)

## Contact

- [GitHub](https://github.com/marcolinolucas)
- [LinkedIn](https://www.linkedin.com/in/lucas-marcolino)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020, Lucas Marcolino.
