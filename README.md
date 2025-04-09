# Glass Lewis Coding Challenge

## Development Setup
From root folder:
1. Install package dependencies with ```npm i```
2. Start containers for postgresql and pgAdmin with: ```npm run start:docker```
3. Start backend api server with: ```npm run start:backend```
4. Start frontend with: ```npm run start:frontend```

(3 different terminals are required)

## Usage
1. Access frontend on http://localhost:4200/
2. Login with username: glass-lewis & password: P4$sw0rD

## PgAdmin
1. Access PgAdmin on http://localhost:8800/
2. Login with username: pbadmin@pgadmin.com & password: postgres
3. As you browse to the created database, you will be asked for the db password: postgres

## Swagger
1. Access swagger on http://localhost:3000/api/swagger

## Linting
1. From root run ```npm run lint --workspaces```

## Testing
1. From frontend folder run ```npm run test```

### Note
Authentication works via JWT tokens. The current expiration time for the JWT token is 2 hours.
If you want to test how the frontend behaves if the token expires, please make the following changes:
1. Open the file ```backend/src/api/authentication/AuthenticationController.ts```
2. Edit private property ```_tokenExpirationTimeInSeconds``` and set a new value (eg. 5)

### Known limitation
All the points below have not been worked on due to the nature of this challenge.
The assumption is that production ready code is not expected, and that this is to be a broad overview of the candidates capabilities.
1. error handling can use some improvement (both fe & be); i know, stack traces in http responses are a big no-no
2. the UI was not given careful consideration (i consider this the job of a designer - ui / ux person). it is merely functional
3. UI could benefit from a better responsiveness concept
4. even though i can write backend code (so technically i'm a fullstack developer), i have a very strong preference towards frontend
5. listing table could use more advanced filtering ui, selection, yada, yada
6. frontend api request need more abstraction
7. unit testing is not complete. i only wrote a couple of "demo" unit tests (app.component.spec.ts & companies.resolver.spec.ts). anything else would take too much time
