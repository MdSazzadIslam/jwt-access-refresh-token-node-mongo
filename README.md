# jwt-access-refresh-token-node-mongo

Tech
1. JWT
2. Redis
3. Node.js
4. MongoDB

1.When you do log in, send 2 tokens (Access token, Refresh token) in response to the client.

2.The access token will have less expiry time and Refresh will have long expiry time.

3.The client (Front end) will store refresh token in his in cookies.

4.The client will use an access token for calling APIs. But when it expires, pick the refresh token from local storage and call auth server API to get the new token.

5.Your auth server will have an API exposed which will accept refresh token and checks for its validity and return a new access token.

6.Once the refresh token is expired, the User will be logged out.
