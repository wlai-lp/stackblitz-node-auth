# Summary
use node to create an authentication server to 
- register new user
- authenticate user, return jwt token
- validate user authentication token

can't run in stackblitz mode, run local


# run
npm install 
node index.js

# register new user
```
curl  -X POST \
  'http://localhost:3000/register' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "username": "user4",
  "password": "password4"
}'
```

# login
```
curl  -X POST \
  'http://localhost:3000/login' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "username": "user1",
  "password": "password1"
}'
```

# validate by accessing a protected endpoint
```
curl  -X GET \
  'http://localhost:3000/protected' \
  --header 'Accept: */*' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoid2VpIiwiaWF0IjoxNjk2MDg4MzAxLCJleHAiOjE2OTYwOTE5MDF9.aon1tnMiFigjlf4hPvIz9f1qtrqUIVjmzRRENq4Fj5o'
```