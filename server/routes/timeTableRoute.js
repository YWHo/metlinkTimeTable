const express = require('express')
const router = express.Router()
const request = require('superagent')

router.get('/:stationCode', function (req, res) {
  const stationCode = req.params.stationCode

  if (stationCode) {
    request
      .get('https://www.metlink.org.nz/api/v1/StopDepartures/' + stationCode)
      .then(apiRes => {
        res.json(extractData(apiRes.body))
      })
      .catch(err => {
        console.log(`Error: GET /timeTable/${stationCode}: ${err.message}`)
        res.json({})
      })
  } else {
    // fail-safe, in case this is triggered
    res.json({})
  }
})

function extractData (jsonInput) {
  return {
    Station: jsonInput.Stop.Name,
    Services: jsonInput.Services
  }
}

module.exports = router
