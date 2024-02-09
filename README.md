# Vaco coding challenge

[Here](docs/sequence-diagram.png) is a sequence diagram to understand the flow of the information
and [here](docs/requests-examples.yaml) is a example from requests that can be imported in a [insomnia](https://insomnia.rest) client to execute

## Environment

- node version: 18
- npm version: 10

> You need to create a .env file in the root with the database url variable pointing to the database file

```
DATABASE_URL="file:./dev.db"
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Battery monitor service

This service have a job that checks every 30 seconds the drones battery percentaje. If a dron  battery reaches below the 25%, a log will be writed on the route `<rootDirectory>/logs/low-battery-monitor.log` with the date, time, dron id and percentaje. Otherwise, a log with the same structure will be placed in `<rootDirectory>/logs/normal-battery-monitor.log`.
