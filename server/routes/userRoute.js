const express = require('express')
const router = express.Router()

const defaultUsers = require('../data/users')
var users = JSON.parse(JSON.stringify(defaultUsers)) // deep copy

// REST: Update (POST /user/:id)
router.post('/:id', (req, res) => {
  updateData(req.params.id, req.body)
  res.redirect('/user')
})

// REST: Update (PUT /user/:id)
router.put('/:id', (req, res) => {
  const status = updateData(req.params.id, req.body)
  if (status == 1) {
    res.json({ status: 'success', user: getUserById(req.params.id) })
  } else if (status == -1) {
    res.json({ status: 'fail', message: 'user is not available' })
  } else {
    res.json({ status: 'fail', message: 'invalid id or data' })
  }
})

function updateData (id, data) {
  if (!id || !data) return 0

  let user = getUserById(id)
  if (user) {
    user.Name = `${data.Name}`
    user.Surname = `${data.Surname}`
    return 1
  }
  return -1
}

// REST: Create (POST /user)
router.post('/', (req, res) => {
  insertData(req.body)
  res.redirect('/user')
})

function insertData (data) {
  if (!data) return

  let largestID = 0

  if (users.length > 0) {
    let tmpUser = JSON.parse(JSON.stringify(users))
    tmpUser.sort((a, b) => b.ID - a.ID)
    largestID = tmpUser[0].ID
  }

  users.push({ ID: largestID + 1, Name: data.Name, Surname: data.Surname })
}

// REST: New (GET /user/new)
router.get('/new', (req, res) => {
  res.status(200).send(
    `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User: New</title>
    </head>
    <body>
      <h2>Submit new user</h2>
      <form action="/user" method="post">
        Name:<br>
        <input type="text" name="Name" required>
        <br>
        Surname:<br>
        <input type="text" name="Surname" required>
        <br><br>
        <input type="submit" value="Submit">
      </form>
    </body>
    </html>`
  )
})

// REST: Show (GET /user/all)
router.get('/all', (req, res) => {
  res.json({ users: users })
})

// REST: Show (GET /user/:id)
router.get('/:id', (req, res) => {
  let user = getUserById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.json({})
  }
})

function getUserById (id) {
  if (id) {
    let found = users.find(user => user.ID == id)
    if (found) {
      return found
    } else {
      return null
    }
  }
}

// REST: Edit (GET /user/:id/edit)
router.get('/:id/edit', (req, res) => {
  let user = getUserById(req.params.id)
  if (user) {
    res.status(200).send(
      `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User: Edit</title>
      </head>
      <body>
        <h2>Edit user</h2>
        <form action="/user/${user.ID}" method="post">
          Name:<br>
          <input type="text" name="Name" value=${user.Name}>
          <br>
          Surname:<br>
          <input type="text" name="Surname" value=${user.Surname}>
          <br><br>
          <input type="submit" value="Submit">
        </form>
      </body>
      </html>`
    )
  } else {
    res.status(400).send('<h2>User does not exist</h2>')
  }
})

// REST: Delete (GET /user/:id/delete)
router.get('/:id/delete', (req, res) => {
  let result = users.filter(user => user.ID != req.params.id)
  users = result
  res.redirect('/user')
})

// REST: Index (GET /user/view)
router.get('/', (req, res) => {
  const list = users
    .map(user => {
      return `<tr>
        <td>${user.ID}</td>
        <td>${user.Name}</td>
        <td>${user.Surname}</td>
        <td><a href="user/${user.ID}">View</a> | <a href="user/${
  user.ID
}/edit">Edit</a> | <a href="user/${user.ID}/delete">Delete</a></td>
      </tr>`
    })
    .join('\n')
  res.status(200).send(
    `<!DOCTYPE html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User: Index</title>
      <style>
        body {
          margin: 20px;
        }
        input {
          font-size: 2rem;
          margin: 10px 30px;
          padding: 20px;
          width:100px;
        }
        table {
          width: 400px;
          max-width: 95vw;
        }
        th, td {
          text-align: center;
        }
      </style>
    </head>
    <html>
    <body>
      <form action="/user/new">
        <input type="submit" value="Add user"/>
      </form>
      <h1>Existing users:</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th> 
            <th>Surname</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${list}
        </tbody>
      </table>
    </body>
    </html>`
  )
})

module.exports = router
