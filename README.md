# Glass Lewis Coding Challenge

## Development Setup

1. Start containers for postgresql and pgAdmin with: ```cd backend && docker-compose up```
2. Start backend api server with: ```cd backend && npm start```
3. Start frontend with: ```cd frontent && npm start```

(3 different terminals are required)

## Usage
1. Access frontend on http://localhost:4200/
2. Login with username: glass-lewis & password: P4$sw0rD

Optional:
3. Access PgAdmin on http://localhost:8800/
4. Login with username: pbadmin@pgadmin.com & password: postgres
5. As you browse to the created database, you will be asked for the db password: postgres

### Note
Authentication works via JWT tokens. The current expiration time for the JWT token is 2 hours.
If you want to test how the frontend behaves if the token expires, please make the following changes:
1. open the file ```backend/src/api/authentication/LoginController.ts```
2. edit private property ```_tokenExpirationTimeInSeconds``` and set a new value (eg. 5)

### Known limitation
All the points below have not been worked on due to the nature of this challenge.
The assumption is that production ready code is not expected, and that this is to be a broad overview of the candidates capabilities.
1. error handling can use some improvement (both fe & be); i know, stack traces in http responses are a big no-no
2. the UI was not given careful consideration (i consider this the job of a designer - ui / ux person). it is merely functional
3. UI could benefit from a better responsiveness concept
4. even though i can write backend code (so technically i'm a fullstack developer), i have a very strong preference towards frontend
5. listing table could use more advanced filtering ui, selection, yada, yada
