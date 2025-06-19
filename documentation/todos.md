# Create Todo and Substask

Used to create todo and substask in same time

**URL** : `POST /api/users/todo/create/:noteId`

**Method** : `POST`

**Auth required** : YES

**Data example**

```json
{
  "todo": [
    {
      "title": "Updated Todo 1",
      "isChecked": true,
      "subtasks": [
        { "title": "Subtask 1", "isChecked": false },
        { "title": "Subtask 2", "isChecked": true }
      ]
    },
    {
      "title": "Updated Todo 2",
      "isChecked": false,
      "subtasks": [
        { "title": "Subtask A", "isChecked": true }
      ]
    }
  ]
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": [
    {
      "created_at": "2025-06-19T08:34:51.777Z",
      "id": "82f91c13-f3c7-4795-9b90-40c82a5140e1",
      "is_checked": true,
      "note_id": "testnote",
      "subtask_id": null,
      "subtasks": [
        {
          "created_at": "2025-06-19T08:34:51.777Z",
          "id": "d69e9000-3b4f-450b-ba07-60f712c8c220",
          "is_checked": true,
          "note_id": "testnote",
          "subtask_id": "82f91c13-f3c7-4795-9b90-40c82a5140e1",
          "title": "Subtask 2",
          "updated_at": "2025-06-19T08:34:51.777Z"
        },
        {
          "created_at": "2025-06-19T08:34:51.777Z",
          "id": "d888410d-8011-444d-b375-80ee226dbdac",
          "is_checked": false,
          "note_id": "testnote",
          "subtask_id": "82f91c13-f3c7-4795-9b90-40c82a5140e1",
          "title": "Subtask 1",
          "updated_at": "2025-06-19T08:34:51.777Z"
        }
      ],
      "title": "Updated Todo 1",
      "updated_at": "2025-06-19T08:34:51.777Z"
    },
    {
      "created_at": "2025-06-19T08:34:51.786Z",
      "id": "ebb9ca82-09d1-4bf9-9bf9-1c3d369f1e66",
      "is_checked": false,
      "note_id": "testnote",
      "subtask_id": null,
      "subtasks": [
        {
          "created_at": "2025-06-19T08:34:51.786Z",
          "id": "bb2c26b1-9a5e-452b-aca4-ba8ca310dbe6",
          "is_checked": true,
          "note_id": "testnote",
          "subtask_id": "ebb9ca82-09d1-4bf9-9bf9-1c3d369f1e66",
          "title": "Subtask A",
          "updated_at": "2025-06-19T08:34:51.786Z"
        }
      ],
      "title": "Updated Todo 2",
      "updated_at": "2025-06-19T08:34:51.786Z"
    }
  ]
}
```

# Update Todo and Substask

Used to update a Todo and Substask

**URL** : PUT /api/users/todo/update/:noteId

**Method** : PUT

**Auth required** : YES

**Data example**
```json
{
  "todo": [
    {
      "id": "testtodo1",
      "title": "Updated Todo 1",
      "isChecked": true,
      "subtasks": [
        { "id": "testsubtask1", "title": "Subtask 1", "isChecked": false }
      ]
    }
  ]
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": [
    {
      "id": "testtodo1",
      "updatedTodo": {
        "count": 1
      }
    },
    {
      "id": "testsubtask1",
      "updatedSub": {
        "count": 1
      }
    }
  ]
}
```

# Delete Todo and all substask

Used to delete Todo and all Substask

**URL** : DELETE /api/users/todo/remove/:todoId

**Method** : DELETE

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "deletedCount": 2,
    "message": "Todo and its direct subtasks deleted"
  }
}
```

# Delete Single substask

Used to delete single substask

**URL** : DELETE /api/users/todo/:todoId/substask/remove/:substaskId

**Method** : DELETE

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "message": "Subtask deleted"
  }
}
```

# Get Todo By Id

Used to get Todo By Id

**URL** : GET /api/users/todo/:todoId

**Method** : GET

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "created_at": "2025-06-19T08:46:18.961Z",
    "id": "testtodo1",
    "is_checked": false,
    "note_id": "testnote",
    "subtask_id": null,
    "subtasks": [
      {
        "created_at": "2025-06-19T08:46:18.961Z",
        "id": "testsubtask1",
        "is_checked": true,
        "note_id": "testnote",
        "subtask_id": "testtodo1",
        "title": "Write Docs",
        "updated_at": "2025-06-19T08:46:18.961Z"
      }
    ],
    "title": "your todo",
    "updated_at": "2025-06-19T08:46:18.961Z"
  }
}
```
