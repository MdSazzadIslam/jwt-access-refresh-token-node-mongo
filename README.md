# jwt-access-refresh-token-node-mongo-redis

Don't forget to give this repo a ⭐ if you like and want to appreciate my efforts

Tech
1. JWT
2. Redis
3. Node.js
4. MongoDB

1.When you do log in, send 2 tokens (Access token, Refresh token) in response to the client.

2.The access token will have less expiry time and Refresh will have long expiry time.

3.The client (Front end) will store refresh token in his in cookies or localstorage.

4.The client will use an access token for calling APIs. But when it expires, pick the refresh token from local storage or cookies and call auth server API to get the new token.

5.Your auth server will have an API exposed which will accept refresh token and checks for its validity and return a new access token.

6.Once the refresh token is expired, the User will be logged out.


![Login](https://user-images.githubusercontent.com/63356649/122559187-d5f56880-d060-11eb-817b-71a7ce354f3d.JPG)

![get](https://user-images.githubusercontent.com/63356649/122560086-f70a8900-d061-11eb-9735-d6a005211326.JPG)

![redis](https://user-images.githubusercontent.com/63356649/122560717-be1ee400-d062-11eb-962f-8c24ccd3e949.JPG)

![Refres](https://user-images.githubusercontent.com/63356649/122563487-160b1a00-d066-11eb-88b1-e15ed462d7d5.JPG)

![privateRoute](https://user-images.githubusercontent.com/63356649/122563832-7dc16500-d066-11eb-8a7d-936b48d24ee2.JPG)

Don't forget to give this repo a ⭐ if you like and want to appreciate my efforts


