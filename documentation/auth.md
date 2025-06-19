# Login

Used to collect a Token for a registered User.

**URL** : `/api/users/login/`

**Method** : `POST`

**Auth required** : NO

**Data example**

```json
{
    "username": "User",
    "password": "rahasia"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "email": "user@test.com",
    "id": "user1",
    "refresh_token": {
      "expired_at": "2025-06-26T08:22:22.000Z",
      "id": "0149358b-49be-4a85-af63-9eaffb91a5bb",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlVzZXIiLCJpYXQiOjE3NTAzMjEzNDEsImV4cCI6MTc1MDkyNjE0MX0.CerQmZKsuqJCt-nBP_UnTWxMSg-HozgZObbGzLSvEd8"
    },
    "token": {
      "expired_at": "2025-06-19T09:02:22.000Z",
      "id": "42602cc9-720d-45ca-828c-ad498563da42",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlVzZXIiLCJpYXQiOjE3NTAzMjEzNDEsImV4cCI6MTc1MDMyMzc0MX0.6qYvqUQI-5tiRuj9Yxf2k66nN15RT1kyNr2jJOwF67k",
      "username": "User"
    },
    "username": "User"
  }
}
```

# Register

Used to registered new account

**URL** : /api/users/register

**Method** : POST

**Auth required** : NO

**Data example**
```json
{
  "username": "Test",
  "email": "user@test.com",
  "password": "rahasia",
  "confirm_password": "rahasia"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "email": "user@test.com",
    "id": "44708d4a-03a8-4d79-87cd-ee6d4d79b2b4",
    "refresh_token": {
      "created_at": "2025-06-19T08:20:45.000Z",
      "expired_at": "2025-06-19T09:00:45.000Z",
      "id": "cab0ef73-6041-4073-a861-3d5a2af8043c",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRlc3QiLCJpYXQiOjE3NTAzMjEyNDQsImV4cCI6MTc1MDkyNjA0NH0.eZjl5EqiEGnN14v5Jg5oeFvV1hFMQ_Jj8bKyv0evBro"
    },
    "token": {
      "expired_at": "2025-06-19T09:00:45.000Z",
      "id": "09ffc089-45da-4446-bbc9-fc337870713d",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRlc3QiLCJpYXQiOjE3NTAzMjEyNDQsImV4cCI6MTc1MDMyMzY0NH0.5m8BbN-zEcuZWS-1D0lO7a3HmPD0-FGXTFjmpt7nvx0",
      "username": "Test"
    },
    "username": "Test"
  }
}
```
