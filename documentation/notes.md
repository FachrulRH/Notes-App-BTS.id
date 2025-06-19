# Create Notes

Used to create notes

**URL** : `/api/users/note/create`

**Method** : `POST`

**Auth required** : YES

**Data example**

```json
{
  "title": "Test Notes"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "created_at": "2025-06-19T08:25:16.850Z",
    "id": "ce23a548-8d6d-44dc-b72f-27eccb449d8c",
    "title": "Test Notes",
    "todos": [],
    "updated_at": "2025-06-19T08:25:16.850Z",
    "user_id": "user1"
  }
}
```

# Update Notes

Used to update a notes

**URL** : PUT /api/users/note/update/:noteId

**Method** : PUT

**Auth required** : YES

**Data example**
```json
{
  "title": "Test Notes Baru"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "created_at": "2025-06-19T08:26:52.663Z",
    "id": "testnote",
    "title": "Test Notes Baru",
    "updated_at": "2025-06-19T08:26:52.697Z",
    "user_id": "user1"
  }
}
```

# Delete Notes

Used to delete a note

**URL** : DELETE /api/users/note/remove/:noteId

**Method** : DELETE

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data":"OK"
}
```

# Get Notes List

Used to get a list note

**URL** : GET /api/users/note

**Method** : GET

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": [
    {
      "created_at": "2025-06-19T08:29:38.298Z",
      "id": "testnote",
      "title": "Test Notes",
      "todos": [],
      "updated_at": "2025-06-19T08:29:38.298Z",
      "user_id": "user1"
    }
  ]
}
```

# Get Note By Id

Used to get Note By Id

**URL** : GET /api/users/note/:noteId

**Method** : GET

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "created_at": "2025-06-19T08:31:17.795Z",
    "id": "testnote",
    "title": "Test Notes",
    "todos": [],
    "updated_at": "2025-06-19T08:31:17.795Z",
    "user_id": "user1"
  }
}
```


