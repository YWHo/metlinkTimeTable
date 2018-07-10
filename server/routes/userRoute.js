const express = require('express')
const router = express.Router()

const users = require('../data/users')

router.get('/:userId', function (req, res) {
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

// return empty json when user id is not given
router.get('/', function (req, res) {
  const list = users
    .map(user => {
      return `<li><a href="user/${user.ID}">${user.Name} ${
        user.Surname
      }</a></li>`
    })
    .join('\n')
  res.status(200).send(`<h1>Existing users:</h1><ul>${list}</ul>`)
})

module.exports = router
