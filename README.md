Server for motiv8r motivational workout meetup application!

TO RUN:
'npm install' in server directory
'npm start'

AVAILABLE ENDPOINTS:

__User__
POST /user/login, /user/signup
GET /user/:id
PUT /user/addPoint/:id

__Meetup__
POST /meetup
POST /meetup/getall
GET /meetup/:id
PUT /meetup/:id
DELETE /meetup/:id

__Log__
POST /log
GET /log
PUT /log
DELETE /log/:id
