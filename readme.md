# Notification API with NestJS

## Description

This is a simple API to send notifications to users. It uses NestJS, prisma and postgresql.

## Features

[] - Create new notifications for users
[] - Mark a notification as read
[] - Mark a notification as canceled
[] - Delete a notification
[] - Detail a notification
[] - Unit tests for all use cases
[] - SOLID and Clean Architecture principles
[] - postgresql image with docker-compose

## Installation

* Clone this repository
* Install dependencies

```bash
$ npm install 
or
$ yarn install
```

* Configure your database connection in the .env file

    - You can use the docker-compose to create a postgresql database

```bash
$ docker-compose up -d
```

* Run the migrations

```bash
$ npm run prisma:migrate:dev
or
$ yarn prisma:migrate:dev
```

* Run the application

```bash
$ npm start
or
$ yarn start
```

* access the application at <http://localhost:3000> [http://localhost:3000]
