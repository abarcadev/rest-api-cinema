# Cinema REST API

## Overview
34 Endpoints:
* url/api/rooms (GET, POST, PATCH, DELETE)
* url/api/seats (GET, POST, PATCH, DELETE)
* url/api/movies (GET, POST, PATCH, DELETE)
* url/api/billboards (GET, POST, PATCH, DELETE)
* url/api/customers (GET, POST, PATCH, DELETE)
* url/api/bookings (GET, POST, PATCH, DELETE)
* url/api/transactions (PATCH)

## Technologies
* Express with TypeScript.
* MySQL database with TypeORM.
* MySQL Docker container.
* Validation env with env-var.
* Testing with Jest.

## Design patterns
* Module pattern
* Adapter pattern
* Dependency injection (DI)

## Getting started
1. Install the dependencies:
```
npm i
```
2. Clone the .env.template to .env file.
3. Run the project:
```
docker compose up -d
```
```
npm run dev
```
4. Check links section.

## Links (Google drive)
* [Run Cinema DB scripts](https://drive.google.com/file/d/1d6n7YSuzI6uuMmm8E7-QvLxQ4Q8Yc4ck/view?usp=sharing)
* [Postman collection](https://drive.google.com/file/d/1V8XcfQV4EdBDagiYr-WdBNHGWovOBSql/view?usp=sharing)

## Testing
1. Clone the .env.template to .env.test file.
2. Use another db.
3. Execute:
```
npm run test
```