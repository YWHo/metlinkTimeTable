const express = require('express')
const router = express.Router()

const defaultUsers = require('../data/users')
var users = JSON.parse(JSON.stringify(defaultUsers)) // deep copy

// REST: Create (POST /user)
router.post('/', (req, res) => {
  console.log('req.body: ', req.body)
  if (req.body) {
    insertData(req.body)
  }
  res.redirect('/user')
})

function insertData (data) {
  let largestID = 1

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
router.get('/:userId', (req, res) => {
  const userId = req.params.userId

  if (userId) {
    let found = users.find(user => {
      if (user.ID == userId) {
        return user
      }
    })

    if (found) {
      res.json(found)
    } else {
      res.json({})
    }
  } else {
    // fail-safe, in case this is triggered
    res.json({})
  }
})

// REST: Index (GET /user/view)
router.get('/', (req, res) => {
  const list = users
    .map(user => {
      return `<tr>
        <td>${user.ID}</td>
        <td>${user.Name}</td>
        <td>${user.Surname}</td>
        <td><a href="user/${user.ID}">View</a></td>
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
