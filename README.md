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
