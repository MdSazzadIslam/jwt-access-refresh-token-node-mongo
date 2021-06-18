# jwt-access-refresh-token-node-mongo
JWT &amp; Refresh Token APIs

How to use Access token and Refresh token and Cahing usin Redis.

Tech
1. JWT
2. Redis
3. Node.js
4. MongoDB

When you do log in, send 2 tokens (Access token, Refresh token) in response to the client.
The access token will have less expiry time and Refresh will have long expiry time.
The client (Front end) will store refresh token in his in cookies.
The client will use an access token for calling APIs. But when it expires, pick the refresh token from local storage and call auth server API to get the new token.
Your auth server will have an API exposed which will accept refresh token and checks for its validity and return a new access token.
Once the refresh token is expired, the User will be logged out.
